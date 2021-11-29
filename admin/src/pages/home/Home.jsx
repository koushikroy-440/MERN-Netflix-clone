import { Chart } from '../../component/chart/Chart';
import { FeaturedInfo } from '../../component/featuredInfo/FeaturedInfo';
import './Home.css';
import { userData } from "../../dummyData";
import { WidgetSm } from '../../component/widgetSm/widgetSm';
import { WidgetLg } from '../../component/widgetLg/widgetLg';
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export const Home = () => {
   
    const MONTHS = useMemo(
        () => [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        []
      );
    
      const [userStats, setUserStats] = useState([]);
    
      useEffect(() => {
        const getStats = async () => {
          try {
            const res = await axios.get("/users/stats", {
              headers: {
                token:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTZmYzQ2NDk0Mjc3MTYwNDg4MmMxNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyNTgzMjMxMSwiZXhwIjoxNjI2MjY0MzExfQ.ATXV-1TTWIGyVBttTQSf0erRWjsgZ8jHQv1ZsUixbng",
              },
            });
            const statsList = res.data.sort(function (a, b) {
              return a._id - b._id;
            });
            statsList.map((item) =>
              setUserStats((prev) => [
                ...prev,
                { name: MONTHS[item._id - 1], "New User": item.total },
              ])
            );
          } catch (err) {
            console.log(err);
          }
        };
        getStats();
      }, [MONTHS]);
    
      return (
        <div className="home">
          <FeaturedInfo />
          <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
          <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />
          </div>
        </div>
      );
}
