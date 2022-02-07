import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, off, set } from "firebase/database";
import { Router, useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import dynamic from "next/dynamic";
import { useStore } from "../../../designer/context";
import { fabric } from "fabric-pure-browser/dist/fabric";
import { useEffect, useState } from "react";
import Header from "../../../components/header";

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


  };

  const initCanvas = () => {
    canvas = new fabric.Canvas("canvas-editor");
  };
  const loadCanvas = () => {
    if (isInit == true) {
    } else {
      get(child(dbRef, `canvases/${id}`)).then((snapshot) => {
        if (snapshot.exists()) {
          isInit = true;
          var json = snapshot.val();
          canvas.clear();
          canvas.loadFromJSON(json.template, function () {
            canvas.renderAll();
            console.log("Render all");
          });
        }
      });
    }
  };

  initFirebase();
  initCanvas();
  loadCanvas();

  const [dimension, setDimension] = useState({
    width: 400,
    height: 400,
  });

  const [histories, setHistories] = useState(["1", "2"]);
  const [active, setActive] = useState(null);

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
    let a = document.createElement("a");
    a.download = "file.png";
    a.href = canvas.toDataURL({
      multiplier: 4,
    });
    a.target = "blank";
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
    img.crossOrigin = "anonymous";

    var text = new fabric.Image(img, {
      width: img.width,
      height: img.height,
      top: 0,
      left: 0,
    });

    // Render the Text on Canvas
    canvas.add(text);
  };

  canvas.on("object:modified", () => {
    let h = JSON.parse(JSON.stringify(histories));

    h.push(canvas.toJSON());
    console.log("h", h);
    setHistories(h);
  });

  const selectObject = (obj) => {
    setActive(obj.selected[0]);
  };

  canvas.on({
    "selection:updated": selectObject,
    "selection:created": selectObject,
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
    <div id="main">
      <div className="container"><Header /></div>
      <div className="container w960">
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
                gg.push(<li>item 1</li>);
              });
              console.log({ gg });
              return gg;
            })()}
          </ul>
          {console.log(active)}
          <label>{active?.type}</label>
          {(() => {
            if (active?.type == "text") {
              return (
                <div>
                  {(() => {
                    let gg = [];
                    [
                      "text",
                      "top",
                      "left",
                      "width",
                      "height",
                      "fill",
                      "textAlign",
                    ].forEach((el) => {
                      gg.push(
                        <div>
                          <label>{el} : </label>
                          <input value={active[el]} />
                          <hr />
                        </div>
                      );
                    });
                    return gg;
                  })()}
                </div>
              );
            } else if (active?.type == "rect") {
              return (
                <div>
                  {(() => {
                    let gg = [];
                    [
                      "top",
                      "left",
                      "width",
                      "height",
                      "fill",
                      "textAlign",
                    ].forEach((el) => {
                      gg.push(
                        <div>
                          <label>{el} : </label>
                          <input value={active[el]} />
                          <hr />
                        </div>
                      );
                    });
                    return gg;
                  })()}
                </div>
              );
            }
          })()}
        </div>
        <div
          className="preview-area"
          style={{ minHeight: "1px", width: "70%" }}
        >
          <canvas id="canvas-editor" style={{ border: "solid 1px #ccc" }} />
        </div>
      </div>
    </div>
  );
}
