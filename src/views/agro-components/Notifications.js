import React, {useRef, useEffect} from "react";
import {useSelector} from "react-redux";
import NotificationAlert from "react-notification-alert";

const notificationsSelector = state => state.notifications;

const Notifications = () => {

  const notificationAlertRef = useRef(null);
  const notification = useSelector(notificationsSelector);

  useEffect(() => {
    if (Object.keys(notification).length) {
      notify(notification)
    }
    }, [notification])

  const notify = (notification) => {
    let type;
    switch (notification.isSuccess) {
      case true:
        type = "success";
        break;
      case false:
        type = "danger";
        break;
      default:
        type = "info";
        break;
    }
    let options = {
      place: "br",
      message: (
        <div>
          <div>
            {notification.message}
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
    </>
  )
}

export default Notifications;