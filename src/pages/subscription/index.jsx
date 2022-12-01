import withProtectedPage from "@/components/withProtectedPage";
import { Table, Space, Button, notification } from "antd";
import { fetchSubscriptions, postSubscriptions } from "@/services/subscription";
import React, { useState, useEffect } from "react";
import { ReloadOutlined } from "@ant-design/icons";

const SubscriptionPage = () => {
  const [subscription, setSubscription] = useState([]);

  const fetchSubscriptionData = async () => {
    const response = await fetchSubscriptions();
    setSubscription(response);
  };

  const handleClick = async (record, approve) => {
    const payload = {
      approve: approve,
      subscriber_id: record.subscriber_id,
      creator_id: record.creator_id,
    };
    try {
      const response = await postSubscriptions(payload);
      notification.success({
        message: "Success",
        description: "Subscription updated successfully",
      });
      fetchSubscriptionData();
    } catch (err) {
      console.log(err);
      notification.error({
        message: "Error",
        description: "Failed to update subscription",
      });
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
  }, []);
  const data = subscription && subscription.data?.subscriptionList;

  const dataSource = (data || []).map((subData) => {
    return {
      key: subData.creator_id + "-" + subData.subscriber_id,
      creator_id: subData.creator_id,
      subscriber_id: subData.subscriber_id,
    };
  });

  const columns = [
    {
      title: "Creator name",
      dataIndex: "creator_id",
      key: "creator_id",
    },
    {
      title: "Subscriber name",
      dataIndex: "subscriber_id",
      key: "subscriber_id",
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      align: "center",
      fixed: "right",
      width: "200px",
      render: (_, record) => (
        <div className="flex justify-evenly">
          <Button type="primary" onClick={() => handleClick(record, "true")}>
            Accept
          </Button>
          <Button type="danger" onClick={() => handleClick(record, "false")}>
            Decline
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="px-14 py-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Subscription Management </h1>
        <Button type="green" onClick={() => fetchSubscriptionData()}>
          <ReloadOutlined style={{ margin: 0, padding: 0 }} />
          Refresh list
        </Button>
      </div>
      <div className="py-2">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            total: dataSource.length,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} Requests`,
            defaultPageSize: 10,
            defaultCurrent: 1,
          }}
        />
      </div>
    </div>
  );
};

export default withProtectedPage(SubscriptionPage);
