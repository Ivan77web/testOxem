import { useEffect, useState } from "react";
import AllSum from "../allSum/AllSum";
import MonthlyPayment from "../monthlyPayment/MonthlyPayment";
import MyButton from "../ui/myButton/MyButton";
import MyInput from "../ui/myInput/MyInput";
import MyInputFirstPayment from "../ui/myInputFirstPayment/MyInputFirstPayment";
import cl from "./App.module.css"

function App() {
  const [allPayment, setAllPayment] = useState(3300000);
  const [percentPayment, setPercentPayment] = useState(13);
  const [firstPayment, setFirstPayment] = useState(429000);
  const [period, setPeriod] = useState(60);
  const [allSum, setAllSum] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [errorAll, setErrorAll] = useState(false)
  const [errorAllPrice, setErrorAllPrice] = useState(false);
  const [errorPercent, setErrorPercent] = useState(false);
  const [errorPeriod, setErrorPeriod] = useState(false);

  useEffect(() => {
    if (errorAllPrice || errorPercent || errorPeriod) {
      setErrorAll(true)
    } else {
      setErrorAll(false)
    }
  }, [errorAllPrice, errorPercent, errorPeriod])

  return (
    <div>
      <div className={cl.container}>
        <div className={cl.intro}>
          <h1>Рассчитайте стоимость <br /> автомобиля в лизинг</h1>
        </div>

        <div className={cl.inputs}>
          <div className={cl.input}>
            <MyInput
              intro="Стоимость автомобиля"
              symbol="&#8381;"
              start="1000000"
              end="6000000"
              value={allPayment}
              setValue={setAllPayment}
              type="price"
              errorAll={errorAll}
              error={errorAllPrice}
              setError={setErrorAllPrice}
            />
          </div>

          <div className={cl.input}>
            <MyInputFirstPayment
              intro="Первоначальный взнос"
              start="10"
              end="60"
              value={percentPayment}
              setValue={setPercentPayment}
              firstPayment={firstPayment}
              setFirstPayment={setFirstPayment}
              allPayment={allPayment}
              errorAll={errorAll}
              error={errorPercent}
              setError={setErrorPercent}
            />
          </div>

          <div className={cl.input + " " + cl.inputPeriod}>
            <MyInput
              intro="Срок лизинга"
              symbol="мес."
              start="1"
              end="60"
              value={period}
              setValue={setPeriod}
              type="mounth"
              errorAll={errorAll}
              error={errorPeriod}
              setError={setErrorPeriod}
            />
          </div>
        </div>

        <div className={cl.calculations}>
          <div className={cl.calcBlock + " " + cl.calcBlockSum}>
            <AllSum
              allSum={allSum}
              setAllSum={setAllSum}
              firstPayment={firstPayment}
              period={period}
              monthlyPayment={monthlyPayment}
              errorAll={errorAll}
            />
          </div>

          <div className={cl.calcBlock}>
            <MonthlyPayment
              allPayment={allPayment}
              firstPayment={firstPayment}
              period={period}
              monthlyPayment={monthlyPayment}
              setMonthlyPayment={setMonthlyPayment}
              errorAll={errorAll}
            />
          </div>

          <div className={cl.calcBlock + " " + cl.button}>
            <MyButton errorAll={errorAll} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;