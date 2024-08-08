import { useState, useEffect } from 'react';

import './index.scss';

// 生成浅色系随机颜色的函数
const generateLightColor = () => {
  const hue = Math.floor(Math.random() * 256);
  const saturation = Math.floor(Math.random() * 30) + 70;
  const lightness = Math.floor(Math.random() * 50) + 50;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const WaterfallLayout = (props) => {
  const { model } = props;
  const [columns, setColumns] = useState([]); // 列向

  // 在组件挂载和 items 状态更新时执行布局计算
  useEffect(() => {
    const newItem = new Array(model.number).fill({}).map((item, index) => ({
      height: Math.floor(Math.random() * 300) + 100,
      key: index + 1,
    }));
    layoutItems(newItem);
  }, [model]);

  function generateArrays(n) {
    const result = [];
    for (let i = 0; i < n; i++) {
      result.push([]);
    }
    return result;
  }

  const layoutItems = (newItem) => {
    const newColumns = generateArrays(model.col);
    const colNum = Math.ceil(model.number / model.col); // 一列能放多少个
    newItem.forEach((item) => {
      // 找到当前高度总和最小的列
      if (model.direction === 'row') {
        const shortestColumn = newColumns.reduce((prev, curr) =>
          curr.reduce((a, b) => a + b.height, 0) <
          prev.reduce((a, b) => a + b.height, 0)
            ? curr
            : prev
        );
        shortestColumn.push(item);
      } else {
        // 按列走
        const rowIndex = Math.floor(item.key / colNum);
        newColumns[rowIndex].push(item);
      }
    });
    setColumns(newColumns);
  };

  return (
    <div className='waterfall-layout'>
      {/* 遍历列数据 */}
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className='column'>
          {/* 遍历列中的每个项目 */}
          {column.map((item, index) => (
            <div
              key={index}
              className='column_item'
              style={{
                width: `100/${index}%`,
                height: `${item.height}px`,
                backgroundColor: generateLightColor(), // 设置随机浅色系背景颜色
              }}
            >
              {item.key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WaterfallLayout;
