import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, off, set } from "firebase/database";
import { Router, useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import dynamic from "next/dynamic";
import { useStore } from "../../../designer/context";
import { fabric } from "fabric-pure-browser/dist/fabric";
import { useEffect, useState } from "react";

let isInit = false;
export default function Admin(props) {
  //   const [state, dispatch] = useStore();
  //   console.log({ state, dispatch });

  const router = useRouter();
  const { id } = router.query;

  var app = null;
  let dbRef = null;
  let canvas = null;

  const initFirebase = () => {
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
    app = initializeApp(firebaseConfig);
    dbRef = ref(getDatabase(app));
  };

  const initCanvas = () => {
    canvas = new fabric.Canvas("canvas-editor");
  };
  const loadCanvas = () => {
    get(child(dbRef, `canvases/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        var json = snapshot.val();
        canvas.clear();
        canvas.loadFromJSON(json.template, function () {
          canvas.renderAll();
          console.log("Render all");
        });
      }
    });
  };

  initFirebase();
  initCanvas();
  loadCanvas();


  const [dimension, setDimension] = useState({
    width: 400,
    height: 400,
  });

  const [histories, setHistories] = useState(['1', '2']);

  //   var canvas = new fabric.Canvas("canvas-editor");
  const saveCanvas = (e) => {
    var json = canvas.toJSON();
    set(child(dbRef, `canvases/${id}`), {
      name: "canvas-1",
      template: json,
    });
    alert("Saved!");
  };

  const downloadCanvas = (e) => {
	  let a = document.createElement('a');
	  a.download = "file.png";
		a.href = canvas.toDataURL({
			'multiplier': 4
		});
		a.target = 'blank';
		a.click();
	};

  const addBox = () => {
    var rect = new fabric.Rect({
      top: 10,
      left: 0,
      width: 100,
      height: 100,
      fill: "red",
    });
    canvas.add(rect);
  };

  const addText = () => {
    // Create a new Text instance
    var text = new fabric.Text("GeeksforGeeks", {
      fill: "green",
    });

    // Render the Text on Canvas
    canvas.add(text);
  };

  const addCircle = () => {
    // Create a new Text instance
    var text = new fabric.Text("GeeksforGeeks", {
      fill: "green",
    });

    // Render the Text on Canvas
    canvas.add(text);
  };

  const addImage = () => {
    // Create a new Text instance
    console.log(fabric.Image);
    var img = document.createElement("img");

    img.src =
      "https://asset.kompas.com/crops/71BqRsoCzXW5dB9ifE4-oNv62N0=/63x100:984x714/750x500/data/photo/2020/01/30/5e32b2b30ce3e.jpeg";
	img.crossOrigin="anonymous"

    var text = new fabric.Image(img, {
      width: img.width,
      height: img.height,
      top: 0,
      left: 0,
    });

    // Render the Text on Canvas
    canvas.add(text);
  };

  canvas.on('object:modified', () => {
	  let h = JSON.parse(JSON.stringify(histories))

	h.push(canvas.toJSON());
	console.log('h', h);
	setHistories(h);
  });



  const changeWidth = (event) => {
    let dd = { ...dimension };
    dd.width = Number(event.target.value);
    setDimension(dd);
  };

  const changeHeight = (event) => {
    let dd = { ...dimension };
    dd.height = Number(event.target.value);
    setDimension(dd);
  };

  const setDim = () => {
    canvas.setWidth(dimension.width);
    canvas.setHeight(dimension.height);
  };

  setDim();

  return (
    <div id="main" className="container">
      <div className="editor" style={{ minHeight: "1px", width: "30%" }}>
        <button onClick={saveCanvas}>Save</button>
        <button onClick={downloadCanvas}>Download</button>
        <label>Width</label>
        <input
          type="number"
          name="width"
          value={dimension.width}
          onChange={changeWidth}
        />
        <label>Height</label>
        <input
          type="number"
          name="height"
          value={dimension.height}
          onChange={changeHeight}
        />
        <hr />
        <button onClick={addBox}>Add Box</button>
        <button onClick={addText}>Add Text</button>
        <button onClick={addCircle}>Add Circle</button>
        <button onClick={addImage}>Add Image</button>

		<ul>
			{(() => {
				let gg = [];
				histories.forEach((i, val) => {
					gg.push(<li>item 1</li>)
				})
				console.log({gg})
				return gg;
			})()}
		</ul>
      </div>
      <div className="preview-area" style={{ minHeight: "1px", width: "70%" }}>
        <canvas id="canvas-editor" style={{ border: "solid 1px #ccc" }} />
      </div>
    </div>
  );
}
