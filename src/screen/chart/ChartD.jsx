import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LineController,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// تسجيل المكونات المستخدمة في المخطط
ChartJS.register(
  CategoryScale,
  LineController,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartD = ({ orders = [], }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current;
    if (!ctx) return;

    // معالجة البيانات لتجميعها حسب الشهر
    const monthlyData = orders.reduce((acc, order) => {
      const date = new Date(order.createdAt);
      const month = date.toLocaleString('ar-EG', { month: 'long' });
      // نفترض أن كل طلب يحتوي على حقل `totalAmount`
      acc[month] = (acc[month] || 0) + (order.totalAmount || 0);
      return acc;
    }, {});

    // فرز الشهور ترتيبًا زمنيًا
    const monthOrder = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const sortedMonths = Object.keys(monthlyData).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));

    const chartLabels = sortedMonths;
    const chartData = sortedMonths.map(month => monthlyData[month]);

    // تدمير أي مخطط سابق قبل إنشاء جديد
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: 'إجمالي السعر',
            data: chartData,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.1)', // تعبئة خفيفة تحت الخط
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: 'rgb(255, 99, 132)',
            tension: 0.3, // يجعل الخط أكثر سلاسة
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // يجعل الحجم مرنًا
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: { size: 14 },
            },
          },
          title: {
            display: true,
            text: 'إجمالي السعر الشهري',
            font: { size: 18 },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 500,
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [orders]);

  return (
    <div style={{ position: 'relative', height: '400px',width:"1100px" }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ChartD;
