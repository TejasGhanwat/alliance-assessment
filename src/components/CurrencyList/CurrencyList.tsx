import  {useState, useEffect} from 'react'
import {baseUrl} from '../../constants/baseUrl'
import { API_KEY } from '../../ENV/apiKey';
import axios from 'axios';
import {COLUMNITEM} from '../../interfaces/columnItems'
import { ASSET } from '../../interfaces/asset';
import BootstrapTable from 'react-bootstrap-table-next';
import CurrencyItemDetails from '../CurrencyItemDetails/CurrencyItemDetails'
import CurrencyExchange from '../CurrencyExchange'

function CurrencyList() {
    const [currencyItems, setcurrencyItems] = useState([]);
    const [filterableCurrencyItems, setFilterableCurrencyItems] = useState([])
    const [currencyItemDetails, setcurrencyItemDetails] = useState<ASSET>()
    const [hasData, setHasData] = useState(false)
    const [currencyExchangeIds, setCurrencyExchangeIds] = useState<string[]>([])
    const [currencyExchangeData, setCurrencyExchangeData] = useState<ASSET[]>([])

    useEffect(()=>{
      axios.get(`${baseUrl}v1/assets`,  {
        headers: {
          'X-CoinAPI-Key': API_KEY ,
        }
      })
      .then(res => {
        const assets = res.data;
        setcurrencyItems(assets)
        setFilterableCurrencyItems(assets)
      })
    }, [])

    const setNewData = (e:React.ChangeEvent<HTMLInputElement>) =>{
      const searchParam = e.target.value.toLocaleLowerCase();
      const updatedList = [...currencyItems];
      const filteredData = updatedList.filter((item:any) =>item.name.toLowerCase().includes(searchParam))
      setFilterableCurrencyItems(filteredData)
    }

    const rowEvents = {
      onClick: (e:React.SyntheticEvent, row:any, rowIndex:number) => {
        setcurrencyItemDetails(row)
        setHasData(true)
        if(currencyExchangeIds.length < 2){
          const newCurrencyExchangeData = [row.asset_id, ...currencyExchangeIds]
          setCurrencyExchangeIds(newCurrencyExchangeData)
        }
        else{
          setCurrencyExchangeIds(row.asset_id)
        }
      }
    };

    useEffect(()=>{
          axios.get(`${baseUrl}v1/exchangerate/${currencyExchangeIds[0]}/${currencyExchangeIds[1]}`,  {
            headers: {
              'X-CoinAPI-Key': API_KEY ,
            }
          })
          .then(res => {
            const currencyExchange = res.data;
            setCurrencyExchangeData(currencyExchange)
          })
    }, [currencyExchangeIds])


    const listColumns: Array<COLUMNITEM> = [
      {
      dataField: 'name',
      text: 'Asset Name',
      sort: true
    },
    {
      dataField: 'price_usd',
      text: 'Price $USD',
      sort: true
    },];


    return (
        <div style={{display:"flex",flexDirection:"row", alignItems:"center", justifyContent:"center" }}>
          <div style={{height:"800px", width:"400px", overflow:"scroll", border:"1px solid black" }}>
            <input type="text" placeholder='search...' onChange={setNewData}></input>
          <BootstrapTable keyField='asset_id' data={ filterableCurrencyItems } columns={ listColumns } rowEvents={ rowEvents} />
          </div>
          <div style={{height:"800px", width:"400px", border:"1px solid black", display:"flex", flexDirection:"column" }}>
            {
              hasData && <CurrencyItemDetails data={currencyItemDetails} />
            }
            <div style={{height:"400px", width:"400px"}}>
            <h3>Currency Exchange</h3>
            <h6>Make two selections from currency table to view Currency Exchange</h6>
            {currencyExchangeIds.length ===2 &&
              <CurrencyExchange currencyExchangeData={currencyExchangeData}/>
            }
            </div>
          </div>
          
        </div>
    );
}

export default CurrencyList;

