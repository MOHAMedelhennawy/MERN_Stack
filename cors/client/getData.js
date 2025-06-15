fetch("http://localhost:4000/data")
  .then((res) => res.json())
  .then((data) => console.log(data));
