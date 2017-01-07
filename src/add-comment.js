import { CommentService } from './comment-service';

var template = (function () {
  let commentService = new CommentService();

  return {
    
    data () {
      return {
        saved: false,
        error: false,
        parentId: null
      };
    },

    methods: {
      save() {
        const comment = this.refs.comment.value;
        const name = this.refs.name.value;
        const parentId = this.refs.parentId.value || null;

        if(!comment || !name) {
          return;
        }

        commentService.saveComment(parentId || null, name, comment)
                      .then(() => {
                         this.set({saved: true});
                         this.set({error: false});
                      })
                      .catch((e) => {
                         console.log(e);
                         this.set({error: true});
                         this.set({saved: false});
                      })
      }
    }
  }

}());

function renderMainFragment ( root, component ) {
	var ifBlock_anchor = createComment( "#if !saved" );
	
	function getBlock ( root ) {
		if ( !root.saved ) return renderIfBlock_0;
		return null;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	var text = createText( "\n\n" );
	var ifBlock1_anchor = createComment( "#if saved" );
	
	function getBlock1 ( root ) {
		if ( root.saved ) return renderIfBlock1_0;
		return null;
	}
	
	var currentBlock1 = getBlock1( root );
	var ifBlock1 = currentBlock1 && currentBlock1( root, component );
	
	var text1 = createText( "\n\n" );
	var ifBlock2_anchor = createComment( "#if error" );
	
	function getBlock2 ( root ) {
		if ( root.error ) return renderIfBlock2_0;
		return null;
	}
	
	var currentBlock2 = getBlock2( root );
	var ifBlock2 = currentBlock2 && currentBlock2( root, component );
	
	var text2 = createText( "\n" );
	
	var input = createElement( 'input' );
	input.type = "hidden";
	component.refs.parentId = input;
	input.value = root.parentId;

	return {
		mount: function ( target, anchor ) {
			insertNode( ifBlock_anchor, target, anchor );
			if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			insertNode( text, target, anchor );
			insertNode( ifBlock1_anchor, target, anchor );
			if ( ifBlock1 ) ifBlock1.mount( ifBlock1_anchor.parentNode, ifBlock1_anchor );
			insertNode( text1, target, anchor );
			insertNode( ifBlock2_anchor, target, anchor );
			if ( ifBlock2 ) ifBlock2.mount( ifBlock2_anchor.parentNode, ifBlock2_anchor );
			insertNode( text2, target, anchor );
			insertNode( input, target, anchor );
		},
		
		update: function ( changed, root ) {
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) ifBlock.teardown( true );
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			}
			
			var _currentBlock1 = currentBlock1;
			currentBlock1 = getBlock1( root );
			if ( _currentBlock1 === currentBlock1 && ifBlock1) {
				ifBlock1.update( changed, root );
			} else {
				if ( ifBlock1 ) ifBlock1.teardown( true );
				ifBlock1 = currentBlock1 && currentBlock1( root, component );
				if ( ifBlock1 ) ifBlock1.mount( ifBlock1_anchor.parentNode, ifBlock1_anchor );
			}
			
			var _currentBlock2 = currentBlock2;
			currentBlock2 = getBlock2( root );
			if ( _currentBlock2 === currentBlock2 && ifBlock2) {
				ifBlock2.update( changed, root );
			} else {
				if ( ifBlock2 ) ifBlock2.teardown( true );
				ifBlock2 = currentBlock2 && currentBlock2( root, component );
				if ( ifBlock2 ) ifBlock2.mount( ifBlock2_anchor.parentNode, ifBlock2_anchor );
			}
			
			input.value = root.parentId;
		},
		
		teardown: function ( detach ) {
			if ( ifBlock ) ifBlock.teardown( detach );
			if ( ifBlock1 ) ifBlock1.teardown( detach );
			if ( ifBlock2 ) ifBlock2.teardown( detach );
			if ( component.refs.parentId === input ) component.refs.parentId = null;
			
			if ( detach ) {
				detachNode( ifBlock_anchor );
				detachNode( text );
				detachNode( ifBlock1_anchor );
				detachNode( text1 );
				detachNode( ifBlock2_anchor );
				detachNode( text2 );
				detachNode( input );
			}
		},
	};
}

function renderIfBlock2_0 ( root, component ) {
	var div = createElement( 'div' );
	div.style.cssText = "margin-top: 10px;";
	div.className = "alert alert-danger";
	
	appendNode( createText( "Sorry, there was an error" ), div );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: noop,
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( div );
			}
		},
	};
}

function renderIfBlock1_0 ( root, component ) {
	var div = createElement( 'div' );
	div.className = "alert alert-success";
	
	appendNode( createText( "Thanks for your feedback! Your comment will post as soon as I review it" ), div );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: noop,
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( div );
			}
		},
	};
}

function renderIfBlock_0 ( root, component ) {
	var div = createElement( 'div' );
	
	var div1 = createElement( 'div' );
	div1.className = "form-group";
	
	appendNode( div1, div );
	
	var input = createElement( 'input' );
	component.refs.name = input;
	input.type = "text";
	input.className = "form-control";
	input.id = "inputName";
	input.placeholder = "Name";
	
	appendNode( input, div1 );
	appendNode( createText( "\n  " ), div );
	
	var div2 = createElement( 'div' );
	div2.className = "form-group";
	div2.style.cssText = "margin-top: 5px;";
	
	appendNode( div2, div );
	
	var textarea = createElement( 'textarea' );
	component.refs.comment = textarea;
	textarea.setAttribute( 'maxLength', "1000" );
	textarea.rows = "5";
	textarea.className = "form-control";
	textarea.id = "inputComment";
	textarea.placeholder = "Comment - no markup please";
	
	appendNode( textarea, div2 );
	appendNode( createText( "\n\n  " ), div );
	
	var button = createElement( 'button' );
	button.type = "button";
	button.className = "btn btn-primary";
	
	function clickHandler ( event ) {
		component.save();
	}
	
	button.addEventListener( 'click', clickHandler, false );
	
	appendNode( button, div );
	appendNode( createText( "Save" ), button );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: noop,
		
		teardown: function ( detach ) {
			if ( component.refs.name === input ) component.refs.name = null;
			if ( component.refs.comment === textarea ) component.refs.comment = null;
			button.removeEventListener( 'click', clickHandler, false );
			
			if ( detach ) {
				detachNode( div );
			}
		},
	};
}

function AddComment ( options ) {
	options = options || {};
	
	this.refs = {}
	this._state = Object.assign( template.data(), options.data );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root;
	this._yield = options._yield;

	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

AddComment.prototype = template.methods;

AddComment.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

AddComment.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

AddComment.prototype.observe = function observe( key, callback, options ) {
 	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;
 
 	( group[ key ] || ( group[ key ] = [] ) ).push( callback );
 
 	if ( !options || options.init !== false ) {
 		callback.__calling = true;
 		callback.call( this, this._state[ key ] );
 		callback.__calling = false;
 	}
 
 	return {
 		cancel: function () {
 			var index = group[ key ].indexOf( callback );
 			if ( ~index ) group[ key ].splice( index, 1 );
 		}
 	};
 };

AddComment.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

AddComment.prototype.set = function set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

AddComment.prototype.teardown = function teardown ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
};

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

function createElement( name ) {
	return document.createElement( name );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function createText( data ) {
	return document.createTextNode( data );
}

function noop() {}

function createComment( data ) {
	return document.createComment( data );
}

export default AddComment;