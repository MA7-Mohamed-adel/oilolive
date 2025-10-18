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

// تسجيل المكونات التي سنستخدمها في المخطط
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

const ChartO = ({ orders = [], }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null); // Ref لتخزين نسخة المخطط

  useEffect(() => {
    const chartCanvas = canvasRef.current;
    if (!chartCanvas) return;

    // معالجة البيانات لتجميعها حسب الشهر
    const monthlyData = orders.reduce((acc, order) => {
      // نفترض أن كل طلب يحتوي على حقل `createdAt`
      const date = new Date(order.createdAt);
      const month = date.toLocaleString('ar-EG', { month: 'long' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    // فرز الشهور ترتيبًا زمنيًا
    const monthOrder = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const sortedMonths = Object.keys(monthlyData).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));

    const chartLabels = sortedMonths;
    const chartData = sortedMonths.map(month => monthlyData[month]);

    // تدمير المخطط القديم قبل إنشاء واحد جديد
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new ChartJS(chartCanvas, {
        type: 'line', // نوع المخطط
        data: {
          labels: chartLabels, // المحور السيني (X-axis) - الشهور
          datasets: [
            {
              label: 'الطلبات', // اسم مجموعة البيانات
              data: chartData, // بيانات الطلبات (Y-axis) - عدد الطلبات
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true, // يجعل المخطط متجاوبًا مع حجم الشاشة
          maintainAspectRatio: false, // يسمح للمخطط بملء الحاوية بالكامل
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'الطلبات الشهرية',
            },
          },
        },
      });

    // دالة التنظيف لتدمير المخطط عند إزالة المكون لتجنب تسرب الذاكرة
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [orders]); // إعادة تنفيذ التأثير عند تغير بيانات الطلبات

  return (
    <div style={{ position: 'relative', height: '400px',width:"1100px" }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ChartO;
