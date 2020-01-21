CREATE OR REPLACE TYPE test_array IS
    VARRAY(40) OF VARCHAR2(100);
/
CREATE OR REPLACE TYPE specimen_array IS
    VARRAY(10) OF VARCHAR2(50);
/

CREATE TABLE patient_info (
    invoice_id       VARCHAR2(100),
    hospital_id      VARCHAR2(100),
    patient_name     VARCHAR2(100),
    patient_phone    VARCHAR2(100),
    patient_gender   VARCHAR2(100),
    patient_age      VARCHAR2(100),
    reffered_by      VARCHAR2(100),
    specimen         VARCHAR2(100),
    date_receive     VARCHAR2(100),
    date_delivery    VARCHAR2(100),
    bm_number        VARCHAR2(100),
    available_tests  VARCHAR2(100),
);
/
CREATE TABLE bilirubin (
    report_id    VARCHAR2(100),
    invoice_id   VARCHAR2(100),
    test_result  VARCHAR2(1000),
);
/
CREATE TABLE tsh (
    report_id    VARCHAR2(100),
    invoice_id   VARCHAR2(100),
    test_result  VARCHAR2(1000),
);
/