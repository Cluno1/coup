import { Flex } from "antd";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export function Error() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/home");
  }
  return (
    <>
      <Flex vertical justify="center" align="center" gap={'small'}>
        <h1>404 NO FOUND</h1>
        <span>资源找不到了,请后续再尝试</span>
        <Button type="primary" onClick={handleClick}>
          返回首页
        </Button>
      </Flex>
    </>
  );
}
