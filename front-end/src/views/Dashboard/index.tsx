import { Form, redirect, useRoutes } from "react-router-dom";
import { Image } from "antd";
import { Button, Card, Space } from "antd";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <Card title="Dashboard" style={{ width: 300 }}>
        <Button type="link" onClick={() => navigate("/users")}>
          Users
        </Button>
        <Button type="link" onClick={() => navigate("/weibos")}>
          Weibos
        </Button>
      </Card>
    </div>
  );
}
