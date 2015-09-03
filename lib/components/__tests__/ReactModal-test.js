jest.dontMock('../ReactModal');
jest.dontMock("react-testutil-query");

var React      = require("react/addons");
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

  it('it shows title', function() {
    render();
    var title = TestUtils.findRenderedDOMComponentWithClass(node, 'react-modal__wrapper__header__title');
    expect(title.props.children.length).toBe(5);
  });

  it('check if close button, close the modal', function() {
    render();
    var closeBtn = TestUtils.findRenderedDOMComponentWithClass(node, 'react-modal__wrapper__header__close');

    node.show();
    TestUtils.Simulate.click(closeBtn);
    expect(node.state.isVisible).toBeFalsy();
  });

  it('check if modal switch between show an hide', function() {
    render();
    var modal = TestUtils.findRenderedDOMComponentWithClass(node, 'react-modal');

    expect(node.state.isVisible).toBeFalsy();
    expect(modal.getDOMNode().style.display).toEqual('none');
    node.show();
    expect(modal.getDOMNode().style.display).toEqual('block');
  });

  it('should call afterOpen,afterClose,beforeOpen,beforeClose', function() {
    //still have to test these
  });
});
