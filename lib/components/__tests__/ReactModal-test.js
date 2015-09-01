jest.dontMock('../ReactModal');
jest.dontMock("react-testutil-query");

var React      = require("react/addons");
var $          = require("jquery");
var $r         = require("react-testutil-query");
var TestUtils  = React.addons.TestUtils;
var ReactModal = require("../ReactModal");

describe('ReactModal', function() {
  var node;

  function render() {
    node = TestUtils.renderIntoDocument(
      <ReactModal title="Lorem">Lorem Ipsum Doloret Sit Amet</ReactModal>
    );
  }

  afterEach(function(done) {
    React.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });


  it('is rendered and is hidden', function() {
    render();
    var $contents = $r(node);

    expect($($contents).is(':visible')).toBeFalsy();
  });

  it('it shows title', function() {
    render();
    var $contents = $r(node);
    var contentText = $contents.find(".react-modal__wrapper__header__title").dom().textContent;

    expect(contentText.length).toBe(5);
  });

  it('has display none at start', function() {
   return
  });
});
