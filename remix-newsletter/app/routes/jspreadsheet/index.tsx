import React, { useRef, useEffect } from "react";
import jspreadsheet from "jspreadsheet";
import render from "@jspreadsheet/render";

import "./styles.css";

const license = '"ZTYyMTQ4MjY3MTAwYjFhOTBmMjIwY2UwYTdjMWIyZTczYWQ4MWFlYzFkYzZlNDYzZWY0ZTExOWE0Mjg4NmIyNTI1ZWU2ZmVmZDgwMjU4NDVhNGYxY2U4ZjYzZGZjNGU3OGRjNjA3NjdkNDVmZTUyMjkwOTlkM2ViY2M2NTQ0MjksZXlKdVlXMWxJam9pU25Od2NtVmhaSE5vWldWMElpd2laR0YwWlNJNk1UWTVOVGMyT1RJd01Dd2laRzl0WVdsdUlqcGJJbXB6YUdWc2JDNXVaWFFpTENKcWMzQnlaV0ZrYzJobFpYUXVZMjl0SWl3aVkzTmlMbUZ3Y0NJc0luTmhiM0p2WTJzdVkyOXRJaXdpZFdVdVkyOXRMbUp5SWl3aWRXNXBkR1ZrTG1Wa2RXTmhkR2x2YmlJc0ltTnZaR1Z6WVc1a1ltOTRMbWx2SWl3aWJHOWpZV3hvYjNOMElsMHNJbkJzWVc0aU9pSXpNU0lzSW5OamIzQmxJanBiSW5ZM0lpd2lkamdpTENKMk9TSXNJbVp2Y20xeklpd2labTl5YlhWc1lTSXNJbkpsYm1SbGNpSXNJbkJoY25ObGNpSXNJbWx0Y0c5eWRHVnlJaXdpZG1Gc2FXUmhkR2x2Ym5NaUxDSmpiMjF0Wlc1MGN5SXNJbk5sWVhKamFDSXNJbU5vWVhKMGN5SXNJbU5zYjNWa0lpd2lZbUZ5SWl3aWNISnBiblFpTENKdFlYTnJJaXdpYzJobFpYUnpJbDE5"';

let download = function (e) {
    // The method should receive the spreadsheet DOM element
    jspreadsheet.render(e);
};

export default function JSpreadsheetDemo() {
    const jssRef = useRef(null);
    const spreadsheet = useRef(null);
    jspreadsheet.setLicense(
        license
    );
    jspreadsheet.setExtensions({ render });

    useEffect(() => {
        // Create only once
        if (!jssRef.current.jspreadsheet) {
            spreadsheet.current = jspreadsheet(jssRef.current, {
                worksheets: [
                    {
                        minDimensions: [6, 10],
                        data: [[1, 2, 3]]
                    }
                ]
            });
        }
    }, null);

    return (
        <div>
            <div ref={jssRef} />
            <br />
            <input
                type="button"
                onClick={() => download(jssRef.current)}
                value="Download"
            />
            <input
                type="button"
                onClick={() => spreadsheet.current[0].setData([[]])}
                value="Reset Data"
            />
            <br />
            <br />
            <br />
            <a href="https://jspreadsheet.com/v9/docs/react" target="_top">
                React spreadsheet
            </a>
        </div>
    );
}
