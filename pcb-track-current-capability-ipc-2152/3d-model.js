//
// @file 				3d-model.js
// @author 				Geoffrey Hunter <gbmhunter@gmail.com> (www.mbedded.ninja)
// @edited 				n/a
// @created				2015-06-27
// @last-modified		2015-06-28
// @brief 				Contains the front-end code for the 'pcb-track-current-capability-ipc-2152' calculator's 3D model.
// @details
//		See the README in the root dir for more info.


document.write('<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.js"></script>');
document.write('<script type="text/javascript" src="http://threejs.org/examples/js/renderers/CanvasRenderer.js"></script>');
document.write('<script type="text/javascript" src="http://threejs.org/examples/js/renderers/Projector.js"></script>');
document.write('<script type="text/javascript" src="http://threejs.org/examples/js/libs/stats.min.js"></script>');
document.write('<script type="text/javascript" src="/lib/eng-calcs-js/lib/OrbitControls.js"></script>');



var pcbTrack3DModelVar;

jQuery( document ).ready(function()
{
    pcbTrack3DModelVar = new pcbTrack3DModel();
    pcbTrack3DModelVar.Init();
	requestAnimationFrame(animate);

	function animate()
	{
		requestAnimationFrame(animate);
		pcbTrack3DModelVar.render();

	}
});

//! @brief      Use to determine if WebGL is available in user's browser.
function WebGLAvailable()
{
    try {
        var canvas = document.createElement( 'canvas' );
        return !!( window.WebGLRenderingContext && (
            canvas.getContext( 'webgl' ) ||
            canvas.getContext( 'experimental-webgl' ) )
        );
    } catch ( e ) {
        return false;
    }
}

//! @brief      Class for 3D model.
function pcbTrack3DModel()
{

    var container, stats;

    var camera, scene, renderer;

    var cube, plane;

    var targetRotation = 0;
    var targetRotationOnMouseDown = 0;

    var mouseX = 0;
    var mouseXOnMouseDown = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var DIAGRAM_WIDTH = 300;
    var DIAGRAM_HEIGHT = 300;

    var COPPER_COLOUR = 0xC87533;
    var PCB_COLOUR = 0x004c00;
    
    var PCB_THICKNESS_DEFAULT = 100;

    var pcbThickness = PCB_THICKNESS_DEFAULT;
    var pcbLength = 500;
    var pcbWidth = 500;

    // The plane thickness is not part of the equation, so we will just go with
    // standard 32um thick copper
    this.copperPlaneThickness = 32;
    this.copperPlaneLength = pcbLength;
    this.copperPlaneWidth = pcbWidth;


    this.copperPlaneGeometry;
    this.copperPlaneMaterial;
    this.copperPlaneMesh;

    this.pcbGeometry;
    this.pcbMaterial;
    this.pcbMesh;

    var trackThickness = 20;
    var trackWidth = 100;
    var trackLength = pcbLength;

    this.heightOfTrackTextAboveTrack = 50;

			
			
    //! @brief      Initialises the 3D model.
    this.Init = function()
    {

        //container = document.createElement( 'div' );
        //document.body.appendChild( container );

        // This gets the DOM element we need
        container = jQuery(".diagram").first().get()[0];

        //console.log(container);

        /*(var info = document.createElement( 'div' );
        info.style.position = 'absolute';
        info.style.top = '10px';
        info.style.width = '100%';
        info.style.textAlign = 'center';
        info.innerHTML = 'Drag to spin the cube';
        container.appendChild( info );(*/

        //==================================================================================//
        //===================================== SCENE ======================================// 
        //==================================================================================//

        scene = new THREE.Scene();


        //==================================================================================//
        //==================================== CAMERA ======================================// 
        //==================================================================================//

        // FOV, aspect, near, far
        camera = new THREE.PerspectiveCamera( 70, DIAGRAM_WIDTH / DIAGRAM_HEIGHT, 1, 1000 );
        camera.position.y = 400;
        camera.position.z = 600;


        //==================================================================================//
        //================================= COPPER PLANE ===================================// 
        //==================================================================================//

        this.copperPlaneGeometry = new THREE.BoxGeometry( this.copperPlaneWidth, this.copperPlaneThickness, this.copperPlaneLength, 10, 10, 10 );
        //var copperPlaneMaterial = new THREE.MeshBasicMaterial( { color: 0x004c00 } );
        // overdraw stops mesh from showing
        this.copperPlaneMaterial = new THREE.MeshLambertMaterial( { color: COPPER_COLOUR, wireframe: false, overdraw: 0.5 } );
        this.copperPlaneMesh = new THREE.Mesh( this.copperPlaneGeometry, this.copperPlaneMaterial );
        this.copperPlaneMesh.overdraw = true;
        this.copperPlaneMesh.position.y = this.copperPlaneThickness/2;
        scene.add( this.copperPlaneMesh );

        this.copperPlaneEdges = new THREE.EdgesHelper( this.copperPlaneMesh, 0x000000 );
        this.copperPlaneEdges.material.linewidth = 2;
        scene.add( this.copperPlaneEdges );


        //==================================================================================//
        //====================================== PCB =======================================// 
        //==================================================================================//

        this.pcbGeometry = new THREE.BoxGeometry( pcbWidth, pcbThickness, pcbLength, 10, 10, 10 );
        //var pcbMaterial = new THREE.MeshBasicMaterial( { color: 0x004c00 } );
        // overdraw stops mesh from showing
        this.pcbMaterial = new THREE.MeshLambertMaterial( { color: PCB_COLOUR, wireframe: false, overdraw: 0.5 } );
        this.pcbMesh = new THREE.Mesh( this.pcbGeometry, this.pcbMaterial );
        this.pcbMesh.overdraw = true;
        this.pcbMesh.position.y = pcbThickness/2 + this.copperPlaneThickness;
        //this.pcbMesh.visible = false;
        scene.add( this.pcbMesh );

        this.pcbEdges = new THREE.EdgesHelper( this.pcbMesh, 0x000000 );
        this.pcbEdges.material.linewidth = 2;
        scene.add( this.pcbEdges );



        //==================================================================================//
        //===================================== TRACK ======================================// 
        //==================================================================================//



        /*var trackGeometry = new THREE.BoxGeometry( 20, 20, 500, 10, 10, 10 );
        var trackMaterial = new THREE.MeshPhongMaterial( { color: 0xC87533 } );
        var trackMesh = new THREE.Mesh( trackGeometry, trackMaterial );
        trackMesh.position.y = 20;
        scene.add( trackMesh );*/

        var trackPoints = [];

        trackPoints.push( new THREE.Vector2 (   0,  0 ) );
        trackPoints.push( new THREE.Vector2 (  trackWidth*(1/10),  trackThickness ) );
        trackPoints.push( new THREE.Vector2 (  trackWidth*(9/10),  trackThickness ) );
        trackPoints.push( new THREE.Vector2 (  trackWidth, 0 ) );

        var shape = new THREE.Shape( trackPoints );

        var extrudeSettings = {
            size 			: 30,
            amount			: trackLength,	// Depth of the extrusion
            steps			: 100,
            bevelEnabled	: false,
            //material		: 1
            //extrudePath		: closedSpline
        };			

        this.trackGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        this.material = new THREE.MeshLambertMaterial( { color: COPPER_COLOUR, wireframe: false } );

        this.trackMesh = new THREE.Mesh( this.trackGeometry, this.material );
        this.trackMesh.position.y = this.pcbMesh.position.y + pcbThickness/2;
        this.trackMesh.position.z = -250;
        this.trackMesh.position.x = -50;

        scene.add( this.trackMesh );

        this.trackEdges = new THREE.EdgesHelper( this.trackMesh, 0x000000 );
        this.trackEdges.material.linewidth = 2;
        scene.add( this.trackEdges );

        //==================================================================================//
        //====================================== TEXT ======================================// 
        //==================================================================================//

        /*
        // Get text from hash

        var theText = "track";

        var text3d = new THREE.TextGeometry( theText, {

            size: 40,
            height: 1,	// Thickness to extrude text
            curveSegments: 2,
            font: "helvetiker"

        });

        text3d.computeBoundingBox();
        var centerOffset = -0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x );

        var textMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: 0.5 } );
        text = new THREE.Mesh( text3d, textMaterial );

        text.position.x = centerOffset;
        text.position.y = this.trackMesh.position.y + trackThickness + this.heightOfTrackTextAboveTrack;
        text.position.z = -this.trackMesh.position.z;

        text.rotation.x = 0;
        text.rotation.y = Math.PI * 2;

        group = new THREE.Group();
        group.add( text );

        //scene.add( group );*/

        //==================================================================================//
        //===================================== ARROW ======================================// 
        //==================================================================================//

        var origin = new THREE.Vector3(10,130,0);
        var terminus  = new THREE.Vector3(0,130,0);
        var direction = new THREE.Vector3().subVectors(terminus, origin).normalize();
        var arrow = new THREE.ArrowHelper(direction, origin, 300, 0x884400);
        arrow.rotation.y = Math.PI * 0.3;
        arrow.rotation.x = Math.PI * 0.1;
        scene.add(arrow);

        //==================================================================================//
        //===================================== LIGHT ======================================// 
        //==================================================================================//

        // create a point light
        var pointLight =
          new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

        // add to the scene
        //scene.add(pointLight);

        scene.add( new THREE.AmbientLight( 0x222222 ) );

        var light = new THREE.PointLight( 0xffffff );
        light.position.copy( camera.position );
        scene.add( light );

        //==================================================================================//
        //===================================== PLANE ======================================// 
        //==================================================================================//

        /*var geometry = new THREE.PlaneBufferGeometry( 200, 200 );
        geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

        var material = new THREE.MeshBasicMaterial( { color: 0xe0e0e0, overdraw: 0.5 } );

        plane = new THREE.Mesh( geometry, material );
        scene.add( plane );*/

        //==================================================================================//
        //=================================== RENDERER =====================================// 
        //==================================================================================//

        if ( WebGLAvailable() ) {
            renderer = new THREE.WebGLRenderer();
        } else {
            renderer = new THREE.CanvasRenderer();
        }

        //renderer = new THREE.CanvasRenderer();
        renderer.setClearColor( 0xf0f0f0 );
        renderer.setPixelRatio( window.devicePixelRatio );
        //renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setSize( DIAGRAM_WIDTH, DIAGRAM_HEIGHT );
        container.appendChild( renderer.domElement );


        //==================================================================================//
        //=================================== CONTROLS =====================================// 
        //==================================================================================//

        var controls = new THREE.OrbitControls(camera, renderer.domElement);


    }



    //! @brief 		This function actually draws the scene in the browser to the user can see it.
    this.render = function()
    {

        //plane.rotation.y = cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.05;
        renderer.render(scene, camera);
    }
    
    //! @brief      Shows/hides the copper plane on the bottom of the PCB.
    this.EnableCopperPlane = function(trueFalse)
    {
        //console.log('EnableCopperPlane() called. trueFalse = ' + trueFalse);
        // We need to use the scale feature
        this.copperPlaneMesh.visible = trueFalse;
        this.copperPlaneEdges.visible = trueFalse;
        this.render();
    }

}


	

