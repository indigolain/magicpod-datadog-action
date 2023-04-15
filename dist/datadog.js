"use strict";
/**
 * Submit metrics returns "Payload accepted" response
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitBatchRunMetircs = exports.submitBatchRunsMetircs = void 0;
// https://docs.datadoghq.com/ja/api/latest/metrics/#submit-metrics
const datadog_api_client_1 = require("@datadog/datadog-api-client");
const magicpod_1 = require("./magicpod");
const configuration = datadog_api_client_1.client.createConfiguration();
const apiInstance = new datadog_api_client_1.v2.MetricsApi(configuration);
function submitBatchRunsMetircs(timestamp, value, batch_run_number, test_setting_name, status, organization_name, project_name) {
    const durationSecondParams = {
        body: {
            series: [
                {
                    metric: 'custom.magicpod-datadog-action.batch_run.duration_second',
                    type: 3,
                    points: [
                        {
                            timestamp: timestamp,
                            value: value
                        }
                    ],
                    tags: [
                        `batch_run_number:${batch_run_number}`,
                        `test_setting_name:${test_setting_name}`,
                        `status:${status}`,
                        `organization_name:${organization_name}`,
                        `project_name:${project_name}`
                    ],
                    unit: 'Second'
                }
            ]
        }
    };
    const countParams = {
        body: {
            series: [
                {
                    metric: 'custom.magicpod-datadog-action.batch_run.count',
                    type: 3,
                    points: [
                        {
                            timestamp: timestamp,
                            value: 1
                        }
                    ],
                    tags: [
                        `batch_run_number:${batch_run_number}`,
                        `test_setting_name:${test_setting_name}`,
                        `status:${status}`,
                        `organization_name:${organization_name}`,
                        `project_name:${project_name}`
                    ],
                    unit: 'Count'
                }
            ]
        }
    };
    if (isTimestampAvailable(timestamp) && !(0, magicpod_1.isStatusRunning)(status)) {
        console.log(`info: timestamp: ${timestamp}, project_name: ${project_name}, test_setting_name: ${test_setting_name}, status: ${status}, value: ${value}`);
        apiInstance
            .submitMetrics(durationSecondParams)
            .then((data) => {
            console.log('API called successfully. custom.magicpod-datadog-action.batch_run.duration_second is submitted.');
        })
            .catch((error) => console.error(error));
        apiInstance
            .submitMetrics(countParams)
            .then((data) => {
            console.log('API called successfully. custom.magicpod-datadog-action.batch_run.count is submitted.');
        })
            .catch((error) => console.error(error));
    }
    else {
        console.log(`timestamp ${timestamp} is not available. skip to send metrics`);
    }
}
exports.submitBatchRunsMetircs = submitBatchRunsMetircs;
function submitBatchRunMetircs(timestamp, value, batch_run_number, test_setting_name, status, organization_name, project_name, pattern_name, order, number) {
    const durationSecondParams = {
        body: {
            series: [
                {
                    metric: 'custom.magicpod-datadog-action.test_case.duration_second',
                    type: 3,
                    points: [
                        {
                            timestamp: timestamp,
                            value: value
                        }
                    ],
                    tags: [
                        `batch_run_number:${batch_run_number}`,
                        `test_setting_name:${test_setting_name}`,
                        `status:${status}`,
                        `organization_name:${organization_name}`,
                        `project_name:${project_name}`,
                        `pattern_name:${pattern_name}`,
                        `order:${order}`,
                        `number:${number}`
                    ],
                    unit: 'Second'
                }
            ]
        }
    };
    const countParams = {
        body: {
            series: [
                {
                    metric: 'custom.magicpod-datadog-action.test_case.count',
                    type: 3,
                    points: [
                        {
                            timestamp: timestamp,
                            value: 1
                        }
                    ],
                    tags: [
                        `batch_run_number:${batch_run_number}`,
                        `test_setting_name:${test_setting_name}`,
                        `status:${status}`,
                        `organization_name:${organization_name}`,
                        `project_name:${project_name}`,
                        `pattern_name:${pattern_name}`,
                        `order:${order}`,
                        `number:${number}`
                    ],
                    unit: 'Count'
                }
            ]
        }
    };
    if (isTimestampAvailable(timestamp) && !(0, magicpod_1.isStatusRunning)(status)) {
        console.log(`info: timestamp: ${timestamp}, project_name: ${project_name}, test_setting_name: ${test_setting_name}, status: ${status}, value: ${value}`);
        apiInstance
            .submitMetrics(durationSecondParams)
            .then((data) => {
            console.log('API called successfully. custom.magicpod-datadog-action.batch_run.duration_second is submitted.');
        })
            .catch((error) => console.error(error));
        apiInstance
            .submitMetrics(countParams)
            .then((data) => {
            console.log('API called successfully. custom.magicpod-datadog-action.batch_run.count is submitted.');
        })
            .catch((error) => console.error(error));
    }
    else {
        console.log(`timestamp ${timestamp} is not available. skip to send metrics`);
    }
}
exports.submitBatchRunMetircs = submitBatchRunMetircs;
// https://docs.datadoghq.com/ja/api/latest/metrics/?code-lang=typescript#submit-metrics
// points:
// Timestamps should be in POSIX time in seconds,
// and cannot be more than ten minutes in the future or more than one hour in the past.
function isTimestampAvailable(unixTimestampSeconds) {
    const currentTime = Math.floor(Date.now() / 1000);
    const tenMinutes = 10 * 60;
    const oneHour = 60 * 60;
    if (unixTimestampSeconds > currentTime + tenMinutes) {
        return false; // 10 minutes in the future
    }
    else if (unixTimestampSeconds < currentTime - oneHour) {
        return false; // one hour in the past
    }
    else {
        return true;
    }
}
