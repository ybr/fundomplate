describe('Include use case', function() {
  var h = {};
  ['table', 'thead', 'tbody', 'th', 'tr', 'td'].forEach(function(tag) { h[tag] = ftl(tag) });
  var fragment = ftl();

  var assert = chai.assert

  it('should return a table of users', function() {
    function displayUsers(users) {
      return h.table(
        h.thead(
          h.tr(
            h.th("First name"),
            h.th("Last name")
          )
        ),
        h.tbody(
          // HERE IS THE INCLUSION CALL
          users.map(displayOneUser)
        )
      )
    }

    // HERE IS THE INCLUSION DECLARATION
    function displayOneUser(user) {
      return h.tr(
        h.td(user.firstname),
        h.td(user.lastname)
      )
    }

    var users = [{
      firstname: "yohann",
      lastname: "bredoux"
    }, {
      firstname: "nizar",
      lastname: "mr"
    }];

    var table = displayUsers(users)()
    assert.equal(table.tagName, 'TABLE')

    var head = table.childNodes.item(0)
    assert.equal(head.tagName, 'THEAD')

    var headRow = head.childNodes.item(0)
    assert.equal(headRow.tagName, 'TR')

    var column0 = headRow.childNodes.item(0)
    assert.equal(column0.tagName, 'TH')
    assert.equal(column0.innerHTML, 'First name')

    var column1 = headRow.childNodes.item(1)
    assert.equal(column1.tagName, 'TH')
    assert.equal(column1.innerHTML, 'Last name')

    var body = table.childNodes.item(1)
    assert.equal(body.tagName, 'TBODY')

    var rowYBR = body.childNodes.item(0)
    assert.equal(rowYBR.tagName, 'TR')

    var column0YBR = rowYBR.childNodes.item(0)
    assert.equal(column0YBR.tagName, 'TD')
    assert.equal(column0YBR.innerHTML, 'yohann')

    var column1YBR = rowYBR.childNodes.item(1)
    assert.equal(column1YBR.tagName, 'TD')
    assert.equal(column1YBR.innerHTML, 'bredoux')

    var rowMRN = body.childNodes.item(1)
    assert.equal(rowYBR.tagName, 'TR')

    var column0MRN = rowMRN.childNodes.item(0)
    assert.equal(column0MRN.tagName, 'TD')
    assert.equal(column0MRN.innerHTML, 'nizar')

    var column1MRN = rowMRN.childNodes.item(1)
    assert.equal(column1MRN.tagName, 'TD')
    assert.equal(column1MRN.innerHTML, 'mr')
  })
})
