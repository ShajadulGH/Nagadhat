"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LodingFixed from "../../LodingFixed";

// Dynamically import ReactApexChart with SSR disabled
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const WithdrawChart = ({ chartInfo }) => {
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState(null);

    useEffect(() => {
        const chartLabel =
            chartInfo?.chartData?.map((item) => item.label) || [];
        const chartValue =
            chartInfo?.chartData?.map((item) => item.value) || [];
        setSeries(chartValue);
        setOptions({
            chart: {
                type: "donut",
            },
            labels: chartLabel,
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        });
    }, [chartInfo]);

    if (!series?.length || series == 0 || !series || !options) {
        return null;
    }
    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="donut"
                    height={280}
                    width={350}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default WithdrawChart;
