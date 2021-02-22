exports['docComment() Parse "" 1'] = {
  "node": "FAILURE",
  "errors": []
}

exports['docComment() Parse "/" 1'] = {
  "node": "FAILURE",
  "errors": []
}

exports['docComment() Parse "// This is a comment." 1'] = {
  "node": "FAILURE",
  "errors": []
}

exports['docComment() Parse "/// This is a doc comment." 1'] = {
  "node": {
    "type": "comment",
    "range": {
      "start": 0,
      "end": 26
    },
    "comment": " This is a doc comment."
  },
  "errors": []
}

exports['docComment() Parse "/// This is a doc comment.↓next line test;" 1'] = {
  "node": {
    "type": "comment",
    "range": {
      "start": 0,
      "end": 27
    },
    "comment": " This is a doc comment.\n"
  },
  "errors": []
}
