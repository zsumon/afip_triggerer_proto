create or replace NONEDITIONABLE TRIGGER TRIGGER1 
AFTER DELETE OR INSERT OR UPDATE OF ID,TEST ON REPORTS 
FOR EACH ROW
BEGIN
  NULL; 
-- reports table is updated..
-- we'll make a network call (to locallhost:port) to notify our server/triggerer to make sure clients get notified
END;

-- CQS - Contineous Query Notification (& grouping by time)  is net plan