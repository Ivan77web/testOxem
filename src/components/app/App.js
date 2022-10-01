import { useState } from "react";
import MyInput from "../ui/myInput/MyInput";
import MyInputFirstPayment from "../ui/myInputFirstPayment/MyInputFirstPayment";
import cl from "./App.module.css"

function App() {
  const [allPayment, setAllPayment] = useState(3300000);
  const [percentPayment, setPercentPayment] = useState(13);
  const [firstPayment, setFirstPayment] = useState(429000);
  const [period, setPeriod] = useState(60)

  return (
    <div className={cl.app}>
      <div className={cl.intro}>
        <h1>Рассчитайте стоимость <br /> автомобиля в лизинг</h1>

        <div className={cl.inputs}>
          <div className={cl.input}>
            <MyInput
              intro="Стоимость автомобиля"
              symbol="&#8381;"
              start="1000000"
              end="6000000"
              value={allPayment}
              setValue={setAllPayment}
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
            />
          </div>

          <div className={cl.input}>
            <MyInput
              intro="Срок лизинга"
              symbol="мес."
              start="1"
              end="60"
              value={period}
              setValue={setPeriod}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
