-- create or replace NONEDITIONABLE TRIGGER TRIGGER1 
-- AFTER DELETE OR INSERT OR UPDATE OF ID,TEST ON REPORTS 
-- FOR EACH ROW -- row lavel trigger instead of table level triggering
-- BEGIN
--   NULL; 
-- -- reports table is updated..
-- -- we'll make a network call (to locallhost:port) to notify our server/triggerer to make sure clients get notified
--   publish_reports_event(:new.id,:new.name); --stored in procudure.sql
-- END;

-- CQS - Contineous Query Notification (& grouping by time)  is next plan insha'Allah

CREATE OR REPLACE TRIGGER REPORTS_TRIGGER 
AFTER INSERT ON REPORTS 
FOR EACH ROW
BEGIN
  publish_reports_event(:new.id,:new.name);
END;