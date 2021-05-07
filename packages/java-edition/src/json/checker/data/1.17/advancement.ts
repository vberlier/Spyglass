import { getRel } from '@spyglassmc/core/lib/service/fileUtil'
import type { JsonStringNode } from '@spyglassmc/json'
import { any, as, boolean, deprecated, dispatch, extract, int, listOf, literal, object, opt, pick, record, resource, simpleString, string, when } from '@spyglassmc/json/lib/checker/primitives'
import { dissectUri } from '../../../binder'
import { blockStateMap, criterionReference, nbt } from '../../util'
import { float_bounds, int_bounds } from './common'
import { block_predicate, damage_predicate, damage_source_predicate, distance_predicate, entity_predicate, fluid_predicate, item_predicate, location_predicate, mob_effect_predicate, predicate } from './predicate'
import { text_component } from './text_component'

const Triggers = [
	'minecraft:bee_nest_destroyed',
	'minecraft:bred_animals',
	'minecraft:brewed_potion',
	'minecraft:changed_dimension',
	'minecraft:channeled_lightning',
	'minecraft:construct_beacon',
	'minecraft:consume_item',
	'minecraft:cured_zombie_villager',
	'minecraft:effects_changed',
	'minecraft:enchanted_item',
	'minecraft:enter_block',
	'minecraft:entity_hurt_player',
	'minecraft:entity_killed_player',
	'minecraft:filled_bucket',
	'minecraft:fishing_rod_hooked',
	'minecraft:hero_of_the_village',
	'minecraft:impossible',
	'minecraft:inventory_changed',
	'minecraft:item_durability_changed',
	'minecraft:item_used_on_block',
	'minecraft:killed_by_crossbow',
	'minecraft:levitation',
	'minecraft:location',
	'minecraft:nether_travel',
	'minecraft:placed_block',
	'minecraft:player_generates_container_loot',
	'minecraft:player_hurt_entity',
	'minecraft:player_interacted_with_entity',
	'minecraft:player_killed_entity',
	'minecraft:recipe_unlocked',
	'minecraft:shot_crossbow',
	'minecraft:slept_in_bed',
	'minecraft:slide_down_block',
	'minecraft:summoned_entity',
	'minecraft:tame_animal',
	'minecraft:target_hit',
	'minecraft:thrown_item_picked_up_by_entity',
	'minecraft:tick',
	'minecraft:used_ender_eye',
	'minecraft:used_totem',
	'minecraft:villager_trade',
	'minecraft:voluntary_exile',
]

const entity = (any([
	entity_predicate,
	listOf(predicate),
]))

export const criterion = as('criterion', dispatch('trigger',
	(trigger) => record({
		trigger: resource(Triggers),
		conditions: opt(dispatch(props => record({
			...when(trigger, ['impossible'], {}, {
				player: opt(entity),
			}),
			...pick(trigger, {
				bee_nest_destroyed: {
					block: opt(resource('block')),
					item: opt(item_predicate),
					num_bees_inside: opt(int),
				},
				bred_animals: {
					parent: opt(entity),
					partner: opt(entity),
					child: opt(entity),
				},
				brewed_potion: {
					potion: opt(resource('potion')),
				},
				changed_dimension: {
					from: opt(resource('dimension')),
					to: opt(resource('dimension')),
				},
				channeled_lightning: {
					victims: opt(listOf(entity)),
				},
				construct_beacon: {
					level: opt(int_bounds),
				},
				consume_item: {
					item: opt(item_predicate),
				},
				cured_zombie_villager: {
					villager: opt(entity),
					zombie: opt(entity),
				},
				effects_changed: {
					effects: opt(object(
						resource('mob_effect'),
						() => mob_effect_predicate,
					)),
				},
				enter_block: {
					block: resource('block'),
					state: opt(blockStateMap(extract('block', props))),
				},
				enchanted_item: {
					levels: opt(int_bounds),
					item: opt(item_predicate),
				},
				entity_hurt_player: {
					damage: opt(damage_predicate),
				},
				entity_killed_player: {
					entity: opt(entity),
					killing_blow: opt(damage_source_predicate),
				},
				filled_bucket: {
					item: opt(item_predicate),
				},
				fishing_rod_hooked: {
					entity: opt(entity),
					item: opt(item_predicate),
				},
				hero_of_the_village: {
					location: opt(location_predicate),
				},
				inventory_changed: {
					slots: opt(record({
						empty: opt(int_bounds),
						occupied: opt(int_bounds),
						full: opt(int_bounds),
					})),
					items: opt(listOf(item_predicate)),
				},
				item_durability_changed: {
					delta: opt(float_bounds),
					durability: opt(float_bounds),
					item: opt(item_predicate),
				},
				item_used_on_block: {
					item: opt(item_predicate),
					location: opt(location_predicate),
				},
				killed_by_crossbow: {
					unique_entity_types: opt(int_bounds),
					victims: opt(listOf(entity)),
				},
				levitation: {
					distance: opt(distance_predicate),
					duration: opt(float_bounds),
				},
				location: {
					location: opt(location_predicate),
				},
				nether_travel: {
					distance: opt(distance_predicate),
					entered: opt(location_predicate),
					exited: opt(location_predicate),
				},
				placed_block: {
					block: opt(resource('block')),
					state: opt(blockStateMap(extract('block', props))),
					item: opt(item_predicate),
					location: opt(location_predicate),
				},
				player_generates_container_loot: {
					loot_table: resource('loot_table'),
				},
				player_hurt_entity: {
					damage: opt(damage_predicate),
					entity: opt(entity),
				},
				player_interacted_with_entity: {
					item: opt(item_predicate),
					entity: opt(entity),
				},
				player_killed_entity: {
					entity: opt(entity),
					killing_blow: opt(damage_source_predicate),
				},
				recipe_unlocked: {
					recipe: resource('recipe'),
				},
				slept_in_bed: {
					location: opt(location_predicate),
				},
				slide_down_block: {
					block: opt(resource('block')),
				},
				shot_crossbow: {
					item: opt(item_predicate),
				},
				summoned_entity: {
					entity: opt(entity),
				},
				tame_animal: {
					entity: opt(entity),
				},
				target_hit: {
					projectile: opt(entity),
					shooter: opt(entity),
					signal_strength: opt(int_bounds),
				},
				thrown_item_picked_up_by_entity: {
					entity: opt(entity),
					item: opt(item_predicate),
				},
				used_ender_eye: {
					distance: opt(float_bounds),
				},
				used_totem: {
					item: opt(item_predicate),
				},
				villager_trade: {
					villager: opt(entity_predicate),
					item: opt(item_predicate),
				},
				voluntary_exile: {
					location: location_predicate,
				},
			}),
			...when(trigger, ['hero_of_the_village', 'location', 'slept_in_bed', 'voluntary_exile'], {
				position: deprecated(record({
					x: opt(float_bounds),
					y: opt(float_bounds),
					z: opt(float_bounds),
				})),
				biome: deprecated(resource('worldgen/biome')),
				feature: deprecated(simpleString), // TODO structure features
				dimension: deprecated(resource('dimension')),
				block: deprecated(block_predicate),
				fluid: deprecated(fluid_predicate),
				light: deprecated(record({
					light: int_bounds,
				})),
				smokey: deprecated(boolean),
			}),
		}))),
	})
))

export const advancement = as('advancement', record({
	display: opt(record({
		icon: record({
			item: resource('item'),
			nbt: opt(nbt()), // TODO: item nbt
		}),
		title: text_component,
		description: text_component,
		background: opt(simpleString),
		frame: opt(literal(['task', 'challenge', 'goal'])),
		show_toast: opt(boolean),
		announce_to_chat: opt(boolean),
		hidden: opt(boolean),
	})),
	parent: opt(resource('advancement')),
	criteria: object(
		string(undefined, undefined, (node, ctx) => {
			// FIXME: Temporary solution to make tests pass when service is not given.
			if (!ctx.service) {
				return
			}
			const parts = dissectUri(getRel(ctx.roots, ctx.doc.uri) ?? '')
			const advancement = `${parts?.namespace}:${parts?.identifier}`
			const criterion = (node as JsonStringNode).value
			ctx.symbols.query(ctx.doc, 'advancement', advancement, criterion)
				.enter({
					data: { subcategory: 'criterion' },
					usage: { type: 'definition', node },
				})
		}),
		() => criterion,
	),
	requirements: opt(listOf(listOf(
		(node, ctx) => {
			const parts = dissectUri(getRel(ctx.roots, ctx.doc.uri) ?? '')
			const advancement = `${parts?.namespace}:${parts?.identifier}`
			criterionReference(advancement)(node, ctx)
		}
	))),
	rewards: opt(record({
		function: opt(resource('function')),
		loot: opt(listOf(resource('loot_table'))),
		recipes: opt(listOf(resource('recipe'))),
		experience: opt(int),
	})),
}))