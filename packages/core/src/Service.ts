import { TextDocument } from 'vscode-languageserver-textdocument'
import { ColorToken, file, FileService, MetaRegistry } from '.'
import { AstNode, FileNode } from './node'
import { ParserContext } from './parser'
import { ProcessorContext } from './processor'
import { TextDocuments } from './TextDocuments'
import { Logger, Source, SymbolTableUtil } from './util'

interface Options {
	fs?: FileService,
	logger?: Logger,
	symbols?: SymbolTableUtil,
}

export class Service {
	public readonly meta = MetaRegistry.getInstance()
	public readonly fs: FileService
	public readonly logger: Logger
	public readonly textDocuments: TextDocuments
	public readonly symbols: SymbolTableUtil

	constructor({
		fs = FileService.create(),
		logger = Logger.create(),
		symbols = new SymbolTableUtil({}),
	}: Options = {}) {
		this.fs = fs
		this.logger = logger
		this.symbols = symbols
		this.textDocuments = new TextDocuments({ fs })
	}

	public parse(doc: TextDocument): FileNode<AstNode> {
		const ctx = ParserContext.create({
			doc,
			fs: this.fs,
			logger: this.logger,
			meta: this.meta,
		})
		const src = new Source(doc.getText())
		const result = file()(src, ctx)
		this.textDocuments.cacheNode(doc.uri, result)
		return result
	}

	public colorize(node: FileNode<AstNode>, doc: TextDocument): readonly ColorToken[] {
		const ctx = ProcessorContext.create({
			doc,
			fs: this.fs,
			logger: this.logger,
			meta: this.meta,
			symbols: this.symbols,
		})
		const colorizer = this.meta.getColorizer(doc.languageId)
		return colorizer(node, ctx)
	}
}
