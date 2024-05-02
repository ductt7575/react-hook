import { useState, useEffect } from 'react';
import './DashBoard.scss';
import { BarChart, Bar, CartesianGrid, Legend, Tooltip, YAxis, XAxis, ResponsiveContainer } from 'recharts';
import { getOverviewDashBoard } from '../../../services/apiService';
import { useTranslation } from 'react-i18next';

const Dashboard = (props) => {
  const [dataOverview, setDataOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    fetchDataOverview();
  }, []);

  const fetchDataOverview = async () => {
    let res = await getOverviewDashBoard();
    if (res && res.EC === 0) {
      setDataOverview(res.DT);
      let Qz = 0,
        Qs = 0,
        Aw = 0;
      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      Aw = res?.DT?.others?.countAnswers ?? 0;

      const data = [
        {
          name: 'Quizzes',
          Qz: Qz,
        },
        {
          name: 'Questions',
          Qs: Qs,
        },
        {
          name: 'Answers',
          Aw: Aw,
        },
      ];
      setDataChart(data);
    }
  };

  console.log(dataChart);

  return (
    <div className="dashboard-container">
      <div className="title">{t('dashboard.heading')}</div>
      <div className="content">
        <div className="c-left row g-3">
          <div className="col-md-6 col-sm-12">
            <div className="child">
              <p className="child-label">{t('dashboard.totalUsers')}</p>
              <span className="child-stats">
                {dataOverview && dataOverview.users && dataOverview.users.total ? (
                  <>{dataOverview.users.total}</>
                ) : (
                  <>0</>
                )}
              </span>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="child">
              <p className="child-label">{t('dashboard.totalQuizzes')}</p>
              <span className="child-stats">
                {dataOverview && dataOverview.others && dataOverview.others.countQuiz ? (
                  <>{dataOverview.others.countQuiz}</>
                ) : (
                  <>0</>
                )}
              </span>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="child">
              <p className="child-label">{t('dashboard.totalQuestions')}</p>
              <span className="child-stats">
                {dataOverview && dataOverview.others && dataOverview.others.countQuestions ? (
                  <>{dataOverview.others.countQuestions}</>
                ) : (
                  <>0</>
                )}
              </span>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="child">
              <p className="child-label">{t('dashboard.totalUsers')}</p>
              <span className="child-stats">
                {dataOverview && dataOverview.others && dataOverview.others.countAnswers ? (
                  <>{dataOverview.others.countAnswers}</>
                ) : (
                  <>0</>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width="95%" height="100%">
            <BarChart data={dataChart}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="Aw" fill="#5ab1ec" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
