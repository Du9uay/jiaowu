import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import './EcoTree.css';

/**
 * EcoTree React组件 - 从Vue版本转换而来
 * 使用D3.js绘制可交互的树形图
 */
const EcoTree = ({
  // Tree data in hierarchical format
  treeData,
  // Custom icons for nodes at different levels
  nodeIcons = {},
  // Initial expanded nodes
  initialExpandedNodes = [],
  // Whether to expand all nodes initially
  expandAll = false,
  // Whether to allow clicking on nodes to expand/collapse
  expandOnClickNode = false,
  // Custom node colors based on depth
  nodeColors = {},
  // Custom node sizes based on depth
  nodeSizes = {},
  // Custom node text colors based on depth
  nodeTextColors = {},
  // Custom node text sizes based on depth
  nodeTextSizes = {},
  // Allow customizing background colors
  backgroundColor = '#f5f6f9',
  // Whether the component is in loading state
  isLoading = false,
  // Loading state text
  loadingText = '正在加载数据...',
  // Error state
  loadingError = false,
  // Error text
  errorText = '加载失败，请稍后重试',
  // 控制节点之间的水平间距
  horizontalNodeSpace = 320,
  // 控制根节点到第一级节点的间距
  rootLevelNodeSpace = 320,
  // 是否显示第一级节点的颜色块
  showLevel1ColorBlock = true,
  // 控制叶子节点到其父节点的间距
  leafNodeSpace = null,
  // 控制不同层级节点之间的间距配置
  levelNodeSpaces = {},
  // 事件回调
  onNodeClick,
  onNodeToggle,
  onRetry,
  onUpdateExpandedNodes
}) => {
  const treeContainer = useRef(null);
  const canvasContextRef = useRef(null);
  const currentHierarchyRootRef = useRef(null);
  const nodeStatesRef = useRef(new Map());
  const resizeObserverRef = useRef(null);

  // Helper Functions
  const getNodeColor = useCallback((depth) => {
    if (nodeColors && nodeColors[depth] !== undefined) {
      return nodeColors[depth];
    }

    // Default colors
    switch (depth) {
      case 0: return '#cfedff'; // Root - Light Blue
      case 1: return '#43a047'; // Level 1 - Green
      case 2: return '#fb8c00'; // Level 2 - Orange 
      case 3: return '#8e24aa'; // Level 3 - Purple
      default: return '#a0a0a0'; // Level 4+ - Gray
    }
  }, [nodeColors]);

  const getNodeSize = useCallback((depth) => {
    if (nodeSizes && nodeSizes[depth] !== undefined) {
      return nodeSizes[depth];
    }

    // Default sizes
    switch (depth) {
      case 0: return 8;
      case 1: return 7;
      case 2: return 6;
      default: return 5;
    }
  }, [nodeSizes]);

  const getNodeTextColor = useCallback((depth) => {
    if (nodeTextColors && nodeTextColors[depth] !== undefined) {
      return nodeTextColors[depth];
    }
    return depth > 0 ? '#ffffff' : '#4c5767';
  }, [nodeTextColors]);

  const getNodeTextSize = useCallback((depth) => {
    if (nodeTextSizes && nodeTextSizes[depth] !== undefined) {
      return nodeTextSizes[depth];
    }

    if (depth === 0) {
      return '20px';
    }
    return ['19px', '18px', '16px'][depth - 1] || '16px';
  }, [nodeTextSizes]);

  const safeNumber = useCallback((value, fallback = 0) => {
    return (value === undefined || isNaN(value)) ? fallback : value;
  }, []);

  // Text Processing Functions
  const getTextWidth = useCallback((text, fontStyle) => {
    if (!canvasContextRef.current) {
      const canvas = document.createElement('canvas');
      canvasContextRef.current = canvas.getContext('2d');
    }
    canvasContextRef.current.font = fontStyle;
    return canvasContextRef.current.measureText(text || '').width;
  }, []);

  const truncateText = useCallback((text, maxWidth, fontStyle) => {
    if (!text) return '';

    if (!canvasContextRef.current) {
      const canvas = document.createElement('canvas');
      canvasContextRef.current = canvas.getContext('2d');
    }

    canvasContextRef.current.font = fontStyle;
    const ellipsis = '...';
    const ellipsisWidth = canvasContextRef.current.measureText(ellipsis).width;

    if (canvasContextRef.current.measureText(text).width <= maxWidth) {
      return text;
    }

    const targetWidth = maxWidth - ellipsisWidth;
    let truncatedText = text;

    while (truncatedText.length > 0) {
      truncatedText = truncatedText.slice(0, -1);
      if (canvasContextRef.current.measureText(truncatedText).width <= targetWidth) {
        return truncatedText + ellipsis;
      }
    }

    return ellipsis;
  }, []);

  // Main render function
  const renderTree = useCallback(() => {
    if (!treeContainer.current || !currentHierarchyRootRef.current) return;

    try {
      // Clear existing visualization
      d3.select(treeContainer.current).html('');

      // Constants for layout
      const rectHeight = 36;
      const textPaddingLeft = 44;
      const textPaddingRight = 28;
      const horizontalPadding = 60;
      const containerWidth = treeContainer.current.clientWidth;

      // Icon dimensions
      const iconWidth = 30;
      const iconHeight = 30;

      // Toggle button dimensions
      const toggleButtonRadius = 12;
      const toggleButtonGap = 10;

      // Calculate node widths and store in Map
      const nodeVisualWidths = new Map();

      // Apply expanded/collapsed state
      currentHierarchyRootRef.current.descendants().forEach(node => {
        const nodeId = node.id || node.data.code;
        const state = nodeId ? nodeStatesRef.current.get(nodeId) : undefined;
        const shouldBeExpanded = state !== undefined
          ? state.expanded
          : (node.depth <= 1 || expandAll);

        if (node.depth > 0) {
          if (!shouldBeExpanded) {
            if (node.children) {
              node._children = node.children;
              node.children = null;
            }
          } else {
            if (node._children) {
              node.children = node._children;
              node._children = null;
            }
          }
        }
      });

      // Calculate tree layout
      const treeLayout = d3.tree().nodeSize([60, horizontalNodeSpace]);
      treeLayout(currentHierarchyRootRef.current);

      // Adjust node positions
      currentHierarchyRootRef.current.descendants().forEach(node => {
        if (node.parent) {
          node.originalY = node.y;
          node.y += 20;

          // Handle level spacing
          let levelSpacingApplied = false;
          if (levelNodeSpaces && Object.keys(levelNodeSpaces).length > 0) {
            const levelKey = `${node.parent.depth}-${node.depth}`;
            if (levelNodeSpaces[levelKey] !== undefined) {
              if (node.parent.depth === 0) {
                const rootOuterSize = Math.max(95 * (safeNumber(getNodeSize(0), 8) / 8), 75);
                node.y = rootOuterSize + levelNodeSpaces[levelKey];
                levelSpacingApplied = true;
              } else {
                const parentY = node.parent.y;
                const parentId = node.parent.id || node.parent.data.code;
                const parentWidth = nodeVisualWidths.get(parentId) || node.parent._calculatedRectWidth || 0;
                const spacingStartY = parentY + parentWidth;
                node.y = spacingStartY + levelNodeSpaces[levelKey];
                levelSpacingApplied = true;
              }
            }
          }

          if (!levelSpacingApplied) {
            if (node.parent.depth === 0 && node.depth === 1) {
              const rootOuterSize = Math.max(95 * (safeNumber(getNodeSize(0), 8) / 8), 75);
              node.y = Math.max(rootLevelNodeSpace, rootOuterSize);
            }
          }

          // Handle leaf nodes
          const isLeafNode = !node.children && !node._children;
          if (leafNodeSpace !== null && isLeafNode) {
            if (node.parent) {
              const parentY = node.parent.y;
              const parentId = node.parent.id || node.parent.data.code;
              const parentWidth = nodeVisualWidths.get(parentId) || node.parent._calculatedRectWidth || 0;
              const minSpacing = 30;
              const spacing = Math.max(leafNodeSpace, minSpacing);
              node.y = parentY + parentWidth + spacing;
            }
          }
        }
      });

      // Filter visible nodes
      const visibleNodes = currentHierarchyRootRef.current.descendants().filter(node => {
        let current = node;
        while (current.parent) {
          if (current.parent.children?.indexOf(current) === -1) {
            return false;
          }
          current = current.parent;
        }
        return true;
      });

      // Calculate node widths
      visibleNodes.forEach(node => {
        const fontSize = getNodeTextSize(node.depth);
        const fontWeight = node.depth < 2 ? 'bold' : 'normal';
        const fontFamily = fontWeight === 'bold'
          ? 'Alibaba-PuHuiTi-SemiBold, sans-serif'
          : 'Alibaba-PuHuiTi-Regular, sans-serif';
        const fontStyle = `${fontWeight} ${fontSize} ${fontFamily}`;

        const actualTextWidth = getTextWidth(node.data.name || '', fontStyle);
        const hasColorBlock = node.depth === 1;
        const colorBlockWidth = hasColorBlock ? 10 : 0;
        const colorBlockPadding = hasColorBlock ? 5 : 0;

        const calculatedWidth = textPaddingLeft + actualTextWidth + textPaddingRight + colorBlockWidth + colorBlockPadding;

        node._calculatedRectWidth = calculatedWidth;
        node._textAvailableWidth = calculatedWidth - textPaddingLeft - (node.depth === 1 ? 10 + 5 : 0) - textPaddingRight + 10;

        const nodeId = node.id || node.data.code;
        if (nodeId) {
          nodeVisualWidths.set(nodeId, calculatedWidth);
        }
      });

      // Calculate boundaries
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

      visibleNodes.forEach(node => {
        minX = Math.min(minX, node.x);
        maxX = Math.max(maxX, node.x);
        minY = Math.min(minY, node.y);
        maxY = Math.max(maxY, node.y);
        maxY = Math.max(maxY, node.y + (nodeVisualWidths.get(node.id || node.data.code) || node._calculatedRectWidth || 0) + 30);
      });

      // Add padding
      const padding = { top: 100, right: 20, bottom: 100, left: 120 };

      // Calculate SVG dimensions
      const realWidth = maxY - minY + padding.left + padding.right;
      const realHeight = maxX - minX + padding.top + padding.bottom;

      const containerHeight = treeContainer.current.clientHeight;
      const containerAvailableWidth = containerWidth - 20;
      let scaleFactor = 1;
      let needsScaling = false;

      if (realWidth > containerAvailableWidth) {
        scaleFactor = containerAvailableWidth / realWidth;
        needsScaling = true;
      }

      const finalHeight = realHeight * (needsScaling ? scaleFactor : 1);
      const useFullHeight = finalHeight < containerHeight;

      // Create SVG
      const svg = d3.select(treeContainer.current)
        .append('svg')
        .attr('width', '100%')
        .attr('height', useFullHeight ? '100%' : finalHeight)
        .attr('viewBox', `0 0 ${realWidth} ${realHeight}`)
        .attr('preserveAspectRatio', 'xMinYMid meet')
        .style('display', 'block')
        .style('max-height', '100%');

      // Add gradients
      const defs = svg.append('defs');
      
      const incrementGradient = defs.append('linearGradient')
        .attr('id', 'increment-gradient')
        .attr('x1', '0%').attr('y1', '0%')
        .attr('x2', '100%').attr('y2', '0%');
      incrementGradient.append('stop').attr('offset', '0%').attr('stop-color', '#E3F5FF');
      incrementGradient.append('stop').attr('offset', '100%').attr('stop-color', '#FF8989');

      const stockGradient = defs.append('linearGradient')
        .attr('id', 'stock-gradient')
        .attr('x1', '0%').attr('y1', '0%')
        .attr('x2', '100%').attr('y2', '0%');
      stockGradient.append('stop').attr('offset', '0%').attr('stop-color', '#E3F5FF');
      stockGradient.append('stop').attr('offset', '100%').attr('stop-color', '#7ABAFF');

      const declineGradient = defs.append('linearGradient')
        .attr('id', 'decline-gradient')
        .attr('x1', '0%').attr('y1', '0%')
        .attr('x2', '100%').attr('y2', '0%');
      declineGradient.append('stop').attr('offset', '0%').attr('stop-color', '#E3F5FF');
      declineGradient.append('stop').attr('offset', '100%').attr('stop-color', '#FFBD7F');

      // Main group
      const mainGroup = svg.append('g')
        .attr('transform', `translate(${padding.left - minY}, ${padding.top - minX})`);

      // Draw links
      mainGroup.selectAll('.tree-view-link')
        .data(visibleNodes.filter(d => d.parent))
        .enter().append('path')
        .attr('class', 'tree-view-link')
        .attr('d', d => {
          const parent = d.parent;
          const sourceX = parent.x;
          const targetX = d.x;
          const targetY = d.y;
          let sourceY;

          if (parent.depth === 0) {
            sourceY = parent.y + 95;
          } else {
            const parentId = parent.id || parent.data.code;
            const parentWidth = safeNumber(nodeVisualWidths.get(parentId) || parent._calculatedRectWidth || 0, 0);
            sourceY = parent.y + parentWidth + toggleButtonGap + toggleButtonRadius;
          }

          return `M ${sourceY},${sourceX}
                  C ${(sourceY + targetY) / 2},${sourceX}
                    ${(sourceY + targetY) / 2},${targetX}
                    ${targetY},${targetX}`;
        })
        .attr('stroke', '#ccc')
        .attr('stroke-width', '1.2px')
        .attr('fill', 'none');

      // Draw nodes
      const node = mainGroup.selectAll('.tree-view-node')
        .data(visibleNodes, d => d.id || d.data.code || `${d.depth}-${d.data.name}`)
        .enter().append('g')
        .attr('class', d => `tree-view-node depth-${d.depth}`)
        .attr('transform', d => `translate(${d.y}, ${d.x})`);

      // Root nodes
      const rootNodeGroup = node.filter(d => d.depth === 0);

      // Root outer circle
      rootNodeGroup.append('circle')
        .attr('class', 'tree-view-root-outer')
        .attr('r', d => {
          const baseSize = 95;
          const configSize = safeNumber(getNodeSize(0), 8);
          return Math.max(baseSize * (configSize / 8), 75);
        })
        .attr('fill', backgroundColor)
        .attr('cx', 0)
        .attr('cy', 0);

      // Root inner circle
      rootNodeGroup.append('circle')
        .attr('class', 'tree-view-root-inner')
        .attr('r', d => {
          const baseSize = 75;
          const configSize = safeNumber(getNodeSize(0), 8);
          return Math.max(baseSize * (configSize / 8), 60);
        })
        .attr('fill', d => getNodeColor(0))
        .attr('cx', 0)
        .attr('cy', 0);

      // Root node text
      rootNodeGroup.append('foreignObject')
        .attr('x', -60)
        .attr('y', -25)
        .attr('width', 120)
        .attr('height', 50)
        .attr('pointer-events', 'none')
        .html(d => {
          const name = d.data.name || '';
          const textColor = getNodeTextColor(d.depth);
          const fontSize = getNodeTextSize(d.depth);
          return `<div style="display: flex; align-items: center; justify-content: center; height: 100%; text-align: center; 
                           font-size: ${fontSize}; font-weight: bold; color: ${textColor}; font-family: 'Alibaba-PuHuiTi-SemiBold', sans-serif; 
                           overflow-wrap: break-word; line-height: 1.2;">
                      ${name}
                  </div>`;
        });

      // Non-root nodes
      const nonRootNodeGroups = node.filter(d => d.depth > 0);

      // Left marker circle
      nonRootNodeGroups.append('circle')
        .attr('class', 'tree-view-node-marker tree-view-left-marker')
        .attr('r', d => getNodeSize(d.depth))
        .attr('cx', rectHeight / 2)
        .attr('cy', 0)
        .attr('fill', d => getNodeColor(d.depth))
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5);

      // Node background
      nonRootNodeGroups.append('path')
        .attr('class', 'tree-view-label-bg')
        .attr('d', d => {
          const w = nodeVisualWidths.get(d.id || d.data.code) || d._calculatedRectWidth || 0;
          const h = rectHeight;
          const r = h / 2;
          const rr = 10;

          return `M ${w - rr},${-h / 2}
                  L ${r},${-h / 2}
                  A ${r},${r} 0 0 0 ${r},${h / 2}
                  L ${w - rr},${h / 2}
                  A ${rr},${rr} 0 0 0 ${w},${h / 2 - rr}
                  L ${w},${-h / 2 + rr}
                  A ${rr},${rr} 0 0 0 ${w - rr},${-h / 2}
                  Z`;
        })
        .attr('fill', d => {
          if (d.depth === 1 && d.data.tag) {
            const gradientMap = {
              '增量行业': 'url(#increment-gradient)',
              '存量行业': 'url(#stock-gradient)',
              '衰落行业': 'url(#decline-gradient)'
            };
            return gradientMap[d.data.tag] || backgroundColor;
          }
          return backgroundColor;
        })
        .style('cursor', 'pointer')
        .on('click', (event, d) => {
          if (onNodeClick) {
            onNodeClick({
              node: d.data,
              level: d.depth + 1,
              event
            });
          }

          if (expandOnClickNode && (d.children || d._children)) {
            event.stopPropagation();
            handleToggleNode(d);
          }
        });

      // Node icon
      nonRootNodeGroups.append('foreignObject')
        .attr('class', 'tree-view-node-icon')
        .attr('x', 0)
        .attr('y', -(iconHeight / 2))
        .attr('width', iconWidth)
        .attr('height', iconHeight)
        .style('pointer-events', 'none')
        .html(d => {
          let icon = '';
          if (nodeIcons && nodeIcons[d.depth]) {
            icon = nodeIcons[d.depth];
          }
          return icon ? `<img src="${icon}" width="${iconWidth}" height="${iconHeight}" style="display: block;" />` : '';
        });

      // Node label text
      nonRootNodeGroups.append('text')
        .attr('class', 'tree-view-node-label')
        .attr('dy', '.35em')
        .attr('y', 0)
        .attr('x', d => textPaddingLeft + 3)
        .attr('text-anchor', 'start')
        .text(d => {
          const fontSize = getNodeTextSize(d.depth);
          const fontWeight = d.depth < 2 ? 'bold' : 'normal';
          const fontFamily = fontWeight === 'bold'
            ? 'Alibaba-PuHuiTi-SemiBold, sans-serif'
            : 'Alibaba-PuHuiTi-Regular, sans-serif';
          const fontStyle = `${fontWeight} ${fontSize} ${fontFamily}`;
          return truncateText(d.data.name, d._textAvailableWidth, fontStyle);
        })
        .style('font-size', d => getNodeTextSize(d.depth))
        .style('font-weight', d => d.depth < 2 ? 'bold' : 'normal')
        .attr('fill', d => getNodeTextColor(d.depth))
        .style('pointer-events', 'none');

      // Node tooltips
      nonRootNodeGroups.append('title')
        .text(d => d.data.name);

      // Toggle buttons
      const toggleNodes = nonRootNodeGroups.filter(d => d.children || d._children);

      toggleNodes.append('circle')
        .attr('class', 'tree-view-toggle-bg')
        .attr('r', toggleButtonRadius)
        .attr('cx', d => safeNumber((nodeVisualWidths.get(d.id || d.data.code) || d._calculatedRectWidth || 0) + toggleButtonGap + toggleButtonRadius, toggleButtonGap + toggleButtonRadius))
        .attr('cy', 0)
        .attr('fill', d => getNodeColor(d.depth))
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .style('cursor', 'pointer')
        .on('click', (event, d) => {
          event.stopPropagation();
          handleToggleNode(d);
        });

      // Toggle icons
      toggleNodes.append('foreignObject')
        .attr('class', 'tree-view-toggle-icon-fo')
        .attr('x', d => safeNumber((nodeVisualWidths.get(d.id || d.data.code) || d._calculatedRectWidth || 0) + toggleButtonGap + toggleButtonRadius - 8, toggleButtonGap + toggleButtonRadius - 8))
        .attr('y', -8)
        .attr('width', 16)
        .attr('height', 16)
        .style('pointer-events', 'none')
        .html(d => {
          const nodeId = d.id || d.data.code;
          if (!nodeId) return '';

          const currentState = nodeStatesRef.current.get(nodeId);
          const isExpanded = currentState !== undefined ? currentState.expanded : (d.children != null);

          return isExpanded ?
            `<svg viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M19 13H5v-2h14v2z"/></svg>` :
            `<svg viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`;
        });

    } catch (error) {
      console.error('Error rendering tree:', error);
    }
  }, [
    backgroundColor, nodeColors, nodeSizes, nodeTextColors, nodeTextSizes,
    expandAll, nodeIcons, horizontalNodeSpace, rootLevelNodeSpace,
    leafNodeSpace, levelNodeSpaces, expandOnClickNode, onNodeClick,
    getNodeColor, getNodeSize, getNodeTextColor, getNodeTextSize,
    safeNumber, getTextWidth, truncateText
  ]);

  // Handle toggle node
  const handleToggleNode = useCallback((d) => {
    const nodeId = d.id || d.data.code;
    if (!nodeId) return;

    const currentState = nodeStatesRef.current.get(nodeId);
    const currentlyExpanded = currentState !== undefined ? currentState.expanded : (d.children != null);

    const newState = { expanded: !currentlyExpanded };
    nodeStatesRef.current.set(nodeId, newState);

    if (onUpdateExpandedNodes) {
      const expandedNodesList = [];
      nodeStatesRef.current.forEach((state, id) => {
        if (state.expanded) {
          expandedNodesList.push(id);
        }
      });
      onUpdateExpandedNodes(expandedNodesList);
    }

    if (onNodeToggle) {
      onNodeToggle({
        node: d.data,
        expanded: !currentlyExpanded
      });
    }

    renderTree();
  }, [onUpdateExpandedNodes, onNodeToggle, renderTree]);

  // Initialize component
  useEffect(() => {
    if (initialExpandedNodes && initialExpandedNodes.length > 0) {
      initialExpandedNodes.forEach(nodeId => {
        nodeStatesRef.current.set(nodeId, { expanded: true });
      });
    }

    if (treeData) {
      currentHierarchyRootRef.current = d3.hierarchy(treeData, d => d.children);
      renderTree();
    }
  }, [treeData, initialExpandedNodes, renderTree]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (treeContainer.current) {
        renderTree();
      }
    };

    window.addEventListener('resize', handleResize);

    if (typeof ResizeObserver !== 'undefined' && treeContainer.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        renderTree();
      });
      resizeObserverRef.current.observe(treeContainer.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [renderTree]);

  // Watch for prop changes that require re-render
  useEffect(() => {
    if (currentHierarchyRootRef.current && treeContainer.current) {
      renderTree();
    }
  }, [
    backgroundColor, nodeColors, nodeSizes, nodeTextColors, nodeTextSizes,
    expandAll, nodeIcons, horizontalNodeSpace, rootLevelNodeSpace,
    leafNodeSpace, levelNodeSpaces, renderTree
  ]);

  return (
    <div className="tree-view-container">
      <div className="tree-view-scroll-wrapper">
        <div ref={treeContainer} className="tree-view-tree-chart"></div>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="chart-loading">
          <div className="loading-spinner"></div>
          <div className="loading-text">{loadingText}</div>
        </div>
      )}
      
      {/* Error state */}
      {loadingError && (
        <div className="chart-error">
          <div className="error-icon">!</div>
          <div className="error-text">{errorText}</div>
          <button className="retry-button" onClick={onRetry}>重新加载</button>
        </div>
      )}
    </div>
  );
};

export default EcoTree;