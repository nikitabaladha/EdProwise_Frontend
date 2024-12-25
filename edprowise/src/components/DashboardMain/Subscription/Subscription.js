import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import getAPI from "../../../api/getAPI";

import SubscriptionTable from "./SubscriptionTable.js";
import AddNewSubscription from "./AddNewSubscription/AddNewSubscriptionl.js";
import ViewSubscription from "./ViewSubscription/ViewSubscription.js";
import UpdateSubscription from "./UpdateSubscription/UpdateSubscription.js";

const Subscription = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [subscription, setSubscription] = useState([]);
  const [selectedSubscription, setSelectedsubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const isCreateRoute =
    location.pathname === "/dashboard/subscriptions/add-new-subscriptions";
  const isViewRoute = location.pathname === "/dashboard/subscriptions/view-subscriptions";
  const isUpdateRoute =
    location.pathname === "/dashboard/subscriptions/update-subscriptions";

  const fetchSchoolData = async () => {
    try {
      setLoading(true);
      const response = await getAPI(`/school`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setSchools(response.data.data);
      } else {
        setError("Failed to load schools.");
      }
    } catch (err) {
      setError("Error fetching school data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriptionData = async () => {
    try {
      const response = await getAPI(`/subscription`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setSubscription(response.data.data);
      } else {
        setError("Failed to load subscriptions.");
      }
    } catch (err) {
      setError("Error fetching subscription data.");
    }
  };

  useEffect(() => {
    fetchSchoolData();
    fetchSubscriptionData();
  }, []);

  const addSubscription = (newSubscription) => {
    setSubscription((prevSubscription) => [...prevSubscription, newSubscription]);
  };

  const updateSubscription = (newUpdatedSubscription) => {
    setSubscription((prevSubscription) =>
      prevSubscription.map((subscription) =>
        subscription._id === newUpdatedSubscription._id ? newUpdatedSubscription : subscription
      )
    );
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {isCreateRoute ? (
        <AddNewSubscription addSubscription={addSubscription} schools={schools} />
      ) : isViewRoute ? (
        <ViewSubscription subscription={subscription} />
      ) : isUpdateRoute ? (
        <UpdateSubscription subscription={subscription} updateSubscription={updateSubscription} schools={schools} />
      ) : (
        <SubscriptionTable
          schools={schools}
          setSchools={setSchools}
          subscription={subscription}
          setSubscription={setSubscription}
          selectedSubscription={selectedSubscription}
          setSelectedsubscription={setSelectedsubscription}
        />
      )}
    </>
  );
};

export default Subscription;
