import { fabric } from "fabric";
import { initializeApp } from "firebase/app";
import {getDatabase, ref, child, get, off, set} from 'firebase/database';
import { Router, useRouter } from "next/router";

export default function Admin() {
	const router = useRouter()
const { id } = router.query;

  const firebaseConfig = {
    apiKey: "AIzaSyCh5AzPccNhM7lmlCFUr74T-7_VvKgV31Y",
    authDomain: "akasadesigner-9999.firebaseapp.com",
    databaseURL:
      "https://akasadesigner-9999-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "akasadesigner-9999",
    storageBucket: "akasadesigner-9999.appspot.com",
    messagingSenderId: "807494869303",
    appId: "1:807494869303:web:ba42b2606864b09f54fab2",
    measurementId: "G-QP2TE74M5E",
  };
  const app = initializeApp(firebaseConfig);

  let dbRef = ref(getDatabase(app));

  get(child(dbRef, `canvases/${id}`)).then((snapshot) => {
	if(snapshot.exists())
	{
		var json = snapshot.val();
		canvas.clear();
		canvas.loadFromJSON(json.template, function() {
			canvas.renderAll();
			console.log("Render all");
		});
	}
  });

  var canvas = new fabric.Canvas("canvas-editor");

  const saveCanvas = (e) => {
    var json = canvas.toJSON();
    set(child(dbRef, `canvases/${id}`), {
		name: 'canvas-1',
		template: json
	});
	alert("Saved!");
  };

  const downloadCanvas = (e) => {};

  canvas.setWidth(800);
  canvas.setHeight(800);

  const addBox = () => {
	var rect = new fabric.Rect({
		top: 10,
		left: 0,
		width: 100,
		height: 100,
		fill: "red",
	  });

	  canvas.add(rect);
  }

  const addText = () => {
	  // Create a new Text instance
	  var text = new fabric.Text('GeeksforGeeks', {
		fill: 'green'
	});

	// Render the Text on Canvas
	canvas.add(text);
  }

  return (
    <div id="main" className="container">
      <div className="editor" style={{ minHeight: "1px", width: "30%" }}>
        <button onClick={saveCanvas}>Save</button>
        <button onClick={downloadCanvas}>Download</button>
		<button onClick={addBox}>Add Box</button>
		<button onClick={addText}>Add Text</button>
        <div>{/* <input type="text" value="" /> */}</div>
        <div>{/* <input type="text" value="" /> */}</div>
      </div>
      <div className="preview-area" style={{ minHeight: "1px", width: "70%" }}>
        <canvas id="canvas-editor" style={{ border: "solid 1px #ccc" }} />
      </div>
    </div>
  );
}
