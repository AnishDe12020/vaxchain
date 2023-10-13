import sensorLib from "node-dht-sensor";

if (!sensorLib.initialize(22, 4)) {
  console.warn("Failed to initialize sensor");
  process.exit(1);
}

setInterval(function () {
  const readout = sensorLib.read();
  console.log(readout.temperature, "C ", readout.humidity, "%");
}, 500);
