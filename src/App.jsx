import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { RadialChart } from 'react-vis'

function App() {
  const [data, setData] = useState()

  //hello

  const columns: GridColDef[] = [
    { field: 'Transaction_id', headerName: 'Transaction_id', width: 150 },
    { field: 'Date', headerName: 'Date', width: 130 },
    { field: 'Debit_Amount', headerName: 'Debit_Amount', width: 150 },
    { field: 'Credit_Amount', headerName: 'Credit_Amount', width: 150 },
    { field: 'Sender', headerName: 'Sender', width: 200 },
    { field: 'Receiver', headerName: 'Receiver', width: 250 }
  ];

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/data'
    })
      .then(function (response) {
        setData(response.data)
    });
  }, [])

  var dates
  var chartone
  var charttwo

  if(data){
    dates = [...data]
    chartone = data.map(el => {
      let debit = parseInt(el.Debit_Amount.replace('$', ''));
      let rObj = {angle: debit};
      return rObj;
    });
    charttwo = data.map(el => {
      let credit = parseInt(el.Credit_Amount.replace('$', ''));
      let rObj = {angle: credit};
      return rObj;
    });
  }
  return (
    <div className="App">
      {dates && 
        <DataGrid
          rows={dates}
          columns={columns}
        />
      }
      <div className="charts">
        {chartone && <RadialChart
          data={chartone}
          width={300}
          height={300} />
        }
        {
          charttwo && <RadialChart
          data={charttwo}
          width={300}
          height={300} />
        }
      </div>
    </div>
  );
}

export default App;
