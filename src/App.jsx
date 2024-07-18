import React, { useState } from 'react'
import './App.css'

function App() {
  //Create 3*3 Matrix
  const initialMatrix = Array(3).fill(Array(3).fill(null));
  // console.log(initialMatrix);
  const [matrix, setMatrix] = useState(initialMatrix);
  //check click order
  const [clickOrder, setClickOrder] = useState([])

  const handlerClick = (rowIndex, colIndex) => {
    //when box is null -> green
    if (matrix[rowIndex][colIndex] === null) {
      const newMatrix = matrix.map((row, rIndex) =>
        row.map((col, cIndex) => {
          //condition check
          if (rowIndex === rIndex && colIndex === cIndex) {
            return "green"
          }
          return col;
        })
      )

      const newClickOrder = [...clickOrder, { rowIndex, colIndex }]
      setClickOrder(newClickOrder)
      // console.log(newClickOrder);
      setMatrix(newMatrix);

      //second case for clickOrder = orange
      if (newClickOrder.length === 9) {
        //for each loop in click order
        newClickOrder.forEach((click, index) =>
          setTimeout(() => {
            setMatrix((prevMatrix) =>
              prevMatrix.map((row, rIndex) =>
                row.map((col, cIndex) => {
                  //condition
                  if (rIndex === click.rowIndex && cIndex === click.colIndex) {
                    return "orange"
                  }
                  return col;
                })
              )
            )
          }, index*1000)
          
        )
      }


    }
  }

  return (
    <>
      <div className='matrix'>
        {matrix.map((row, rowIndex) => (
          <div className='row' key={rowIndex}>
            {row.map((col, colIndex) => (
              <div
                className='box'
                key={colIndex}
                onClick={() => handlerClick(rowIndex, colIndex)}
                style={{ background: col || "grey", color: "white" }}
              >
                {` ${rowIndex},${colIndex}`}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default App