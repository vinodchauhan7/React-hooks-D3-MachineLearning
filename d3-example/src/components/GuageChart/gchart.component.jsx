import React, { useEffect, useRef, useState } from "react";
import ml5 from "ml5";
import useInterval from "./../../utils/useInterval";
import GuageChart from "./guageChart";
let classifier;

const GuageChartExample = () => {
  const videoRef = useRef();
  const [gaugeData, setGaugeData] = useState([0.5, 0.5]);
  const [shouldClassify, setShouldClassify] = useState(false);

  useEffect(() => {
    classifier = ml5.imageClassifier("./myModel/model.json", () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(stream => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        });
    });
  }, []);

  useInterval(() => {
    if (classifier && shouldClassify) {
      classifier.classify(videoRef.current, (error, results) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log(results);
        results.sort((a, b) => b.label.localeCompare(a.label));
        setGaugeData(results.map(entry => entry.confidence));
      });
    }
  }, 500);

  return (
    <React.Fragment>
      <h1>Guage Chart with ML</h1>
      <small>
        [
        {gaugeData[0].toFixed(2) >= 0.5
          ? "Not Available"
          : gaugeData[0].toFixed(2)}
        ,{" "}
        {gaugeData[1].toFixed(2) >= 0.5 ? "Available" : gaugeData[1].toFixed(2)}
        ]
      </small>
      <button onClick={() => setShouldClassify(!shouldClassify)}>
        {shouldClassify ? "Stop classifying" : "Start classifying"}
      </button>
      <GuageChart data={gaugeData} />
      <video
        ref={videoRef}
        style={{ transform: "scale(-1, 1)" }}
        width="300"
        height="150"
      />
    </React.Fragment>
  );
};

export default GuageChartExample;
