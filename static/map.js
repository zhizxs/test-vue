
[
    ['西安', XAData],
    ['西宁', XNData],
    ['银川', YCData]
].forEach(function(item, i) {
    
});

var option = {
    backgroundColor: '#000',
    title: {
        text: '模拟航线',
        subtext: '数据纯属虚构',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: function(params, ticket, callback) {
            if (params.seriesType == "effectScatter") {
                return "线路：" + params.data.name + "" + params.data.value[2];
            } else if (params.seriesType == "lines") {
                return params.data.fromName + ">" + params.data.toName + "<br />" + params.data.value;
            } else {
                return params.name;
            }
        }
    },
    legend: {
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data: ['西安 Top3', '西宁 Top3', '银川 Top3'],
        textStyle: {
            color: '#fff'
        },
        selectedMode: 'multiple'
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: true,
                color: '#fff'
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#00186E',
                borderColor: '#195BB9',
                borderWidth: 1,
            },
            emphasis: {
                areaColor: '#2B91B7'
            }
        }
    },
    series: series
};