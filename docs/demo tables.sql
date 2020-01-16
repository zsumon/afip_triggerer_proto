CREATE OR REPLACE TYPE test_array IS
    VARRAY(40) OF VARCHAR2(100);
/
CREATE OR REPLACE TYPE specimen_array IS
    VARRAY(10) OF VARCHAR2(50);
/

CREATE TABLE patient_info (
    invoice_id       VARCHAR2(50),
    hospital_id      VARCHAR2(50),
    patient_name     VARCHAR2(50),
    patient_phone    VARCHAR2(12),
    patient_gender   VARCHAR2(12),
    patient_age      NUMBER,
    reffered_by      VARCHAR2(50),
    specimen         specimen_array,
    date_receive     DATE,
    date_delivery    DATE,
    bm_number        VARCHAR2(50),
    available_tests  test_array
);
/
CREATE TABLE bilirubin (
    report_id    VARCHAR2(20),
    invoice_id   VARCHAR2(50),
    test_result  VARCHAR2(500)
);
/
CREATE TABLE tsh (
    report_id    VARCHAR2(20),
    invoice_id   VARCHAR2(50),
    test_result  VARCHAR2(500)
);
/