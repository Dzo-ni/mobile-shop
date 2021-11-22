import React from "react";
import Slider from "@material-ui/core/Slider";

const followersMarks = [
  {
    value: 1000,
    scaledValue: 1000,
    label: "1k",
  },
  {
    value: 10000,
    scaledValue: 10000,
    label: "10k",
  },
  {
    value: 20000,
    scaledValue: 20000,
    label: "20k",
  },
  {
    value: 30000,
    scaledValue: 30000,
    label: "30k",
  },
  {
    value: 40000,
    scaledValue: 40000,
    label: "40k",
  },
  {
    value: 50000,
    scaledValue: 50000,
    label: "50k",
  },
  {
    value: 65000,
    scaledValue: 65000,
    label: "65k",
  },
];

const scaleValues = (valueArray) => {
  return [scale(valueArray[0]), scale(valueArray[1])];
};
const scale = (value) => {
  if (value === undefined) {
    return undefined;
  }
  const previousMarkIndex = Math.floor(value / 65000);
  const previousMark = followersMarks[previousMarkIndex];
  const remainder = value % 65000;
  if (remainder === 0) {
    return previousMark.scaledValue;
  }
  const nextMark = followersMarks[previousMarkIndex + 1];
  const increment = (nextMark.scaledValue - previousMark.scaledValue) / 65000;
  return remainder * increment + previousMark.scaledValue;
};

function numFormatter(num) {
  if (num > 999 && num < 65000) {
    return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
  }
}

const SliderUI = ({ handleValues }) => {
  // Our States
  const [value, setValue] = React.useState([1000, 65000]);

  // Changing State when volume increases/decreases
  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleValues(newValue);
    console.log(newValue);
  };

  return (
    <div
      style={{
        margin: "auto",
        display: "block",
        width: "fit-content",
      }}
    >
      <h3>FILTER PRODUCTS</h3>
      <div id="range-slider" gutterbottom="true">
        Select Price Range:
      </div>
      <Slider
        value={value}
        min={1000}
        id="slider"
        step={1000}
        max={65000}
        valueLabelFormat={numFormatter}
        marks={followersMarks}
        scale={scaleValues}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
      <span
        style={{
          display: "inline-block",
        }}
      >
        Price between {value[0]}$ - {value[1]}${" "}
      </span>
    </div>
  );
};

export default SliderUI;
