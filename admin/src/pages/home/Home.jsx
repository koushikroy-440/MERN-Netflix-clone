import { Chart } from '../../component/chart/Chart';
import { FeaturedInfo } from '../../component/featuredInfo/FeaturedInfo';
import './Home.css';
import { userData } from "../../dummyData";
import { WidgetSm } from '../../component/widgetSm/widgetSm';
import { WidgetLg } from '../../component/widgetLg/widgetLg';


export const Home = () => {
    return (
        <div className="home">
            <FeaturedInfo/>
            <Chart data={userData} title='User Analytics' grid dataKey='Active User'/>
            <div className="homeWidgets">
                <WidgetSm/>
                <WidgetLg/>
            </div>
        </div>
    )
}
