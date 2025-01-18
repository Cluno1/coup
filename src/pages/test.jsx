import { Button } from "antd";

export default function Test(){


return demo()
}


function demo() {
    return (
        <>
        <h1>test</h1>
      <Button
        onClick={() => {
          if ('vibrate' in navigator) {
           
            window.navigator.vibrate(200);
          }else{
            alert('no vibrate')
          }
        }}
      >
        Click
      </Button>
      </>
    );
  }
  