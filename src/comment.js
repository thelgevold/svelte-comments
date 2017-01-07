import AddComment from './add-comment';

function applyComputations ( state, newState, oldState ) {
	if ( ( 'comment' in newState && typeof state.comment === 'object' || state.comment !== oldState.comment ) ) {
		state.created = newState.created = template.computed.created( state.comment );
	}
}

var template = (function () {
  return {
    data () {
      return {
        comment: {},
        replying: false
      };
    },

    computed: {
      created: comment => new Date(comment['created']).toDateString()
    },

    components: {AddComment}
  }
}());

function renderMainFragment ( root, component ) {
	var div = createElement( 'div' );
	
	var div1 = createElement( 'div' );
	div1.className = "comment";
	
	appendNode( div1, div );
	
	var div2 = createElement( 'div' );
	div2.className = "commentDate";
	
	appendNode( div2, div1 );
	var text = createText( root.created );
	appendNode( text, div2 );
	appendNode( createText( "\n    " ), div1 );
	
	var h5 = createElement( 'h5' );
	
	appendNode( h5, div1 );
	var text2 = createText( root.comment['author'] );
	appendNode( text2, h5 );
	appendNode( createText( "\n    " ), div1 );
	
	var div3 = createElement( 'div' );
	
	appendNode( div3, div1 );
	var text4 = createText( root.comment.text );
	appendNode( text4, div3 );
	appendNode( createText( "\n    " ), div1 );
	
	var div4 = createElement( 'div' );
	div4.className = "reply-link";
	
	appendNode( div4, div1 );
	
	var a = createElement( 'a' );
	
	function clickHandler ( event ) {
		component.set({replying: true});
	}
	
	a.addEventListener( 'click', clickHandler, false );
	
	appendNode( a, div4 );
	appendNode( createText( "Reply" ), a );
	appendNode( createText( "\n    " ), div1 );
	var ifBlock_anchor = createComment( "#if replying" );
	appendNode( ifBlock_anchor, div1 );
	
	function getBlock ( root ) {
		if ( root.replying ) return renderIfBlock_0;
		return null;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: function ( changed, root ) {
			text.data = root.created;
			
			text2.data = root.comment['author'];
			
			text4.data = root.comment.text;
			
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) ifBlock.teardown( true );
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			}
		},
		
		teardown: function ( detach ) {
			a.removeEventListener( 'click', clickHandler, false );
			if ( ifBlock ) ifBlock.teardown( false );
			
			if ( detach ) {
				detachNode( div );
			}
		},
	};
}

function renderIfBlock_0 ( root, component ) {
	var addComment_initialData = {
		parentId: root.comment['id']
	};
	var addComment = new template.components.AddComment({
		target: null,
		_root: component._root || component,
		data: addComment_initialData
	});

	return {
		mount: function ( target, anchor ) {
			addComment._fragment.mount( target, anchor );
		},
		
		update: function ( changed, root ) {
			var addComment_changes = {};
			
			if ( 'comment' in changed ) addComment_changes.parentId = root.comment['id'];
			
			if ( Object.keys( addComment_changes ).length ) addComment.set( addComment_changes );
		},
		
		teardown: function ( detach ) {
			addComment.teardown( detach );
		},
	};
}

function Comment ( options ) {
	options = options || {};
	
	this._state = Object.assign( template.data(), options.data );
applyComputations( this._state, this._state, {} );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root;
	this._yield = options._yield;

	this._renderHooks = [];
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
	
	while ( this._renderHooks.length ) {
		var hook = this._renderHooks.pop();
		hook.fn.call( hook.context );
	}
}

Comment.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

Comment.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

Comment.prototype.observe = function observe( key, callback, options ) {
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

Comment.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

Comment.prototype.set = function set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	applyComputations( this._state, newState, oldState )
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
	
	while ( this._renderHooks.length ) {
		var hook = this._renderHooks.pop();
		hook.fn.call( hook.context );
	}
};

Comment.prototype.teardown = function teardown ( detach ) {
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

function createComment( data ) {
	return document.createComment( data );
}

export default Comment;