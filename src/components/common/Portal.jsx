import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children, className = 'portal-container' }) => {
  const [container, setContainer] = useState(null);

  console.log('Portal组件初始化 - 创建DOM挂载点');

  useEffect(() => {
    // 创建容器元素
    const portalContainer = document.createElement('div');
    portalContainer.className = className;
    
    // 添加到body
    document.body.appendChild(portalContainer);
    setContainer(portalContainer);

    console.log('Portal挂载点已创建并添加到document.body', {
      className,
      element: portalContainer
    });

    // 清理函数
    return () => {
      console.log('Portal组件卸载 - 清理DOM挂载点');
      if (document.body.contains(portalContainer)) {
        document.body.removeChild(portalContainer);
      }
    };
  }, [className]);

  // 只有容器存在时才渲染Portal
  if (!container) {
    console.log('Portal容器尚未创建，暂不渲染内容');
    return null;
  }

  console.log('Portal正在渲染内容到body容器');
  return createPortal(children, container);
};

export default Portal; 