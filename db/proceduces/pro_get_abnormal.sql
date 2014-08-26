USE [fksmis1]
GO

/****** Object:  StoredProcedure [dbo].[pro_get_abnormal]    Script Date: 08/14/2014 10:30:30 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		wbgong
-- Create date: 2014-08-14
-- Description:	“Ï≥£…Ë±∏
-- =============================================
CREATE PROCEDURE [dbo].[pro_get_abnormal] 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	label1:begin
		DECLARE @sql nvarchar(max),@bit bit,@smallint smallint;
	        
	    set @bit = CONVERT(bit,0);
	    set @smallint = CONVERT(smallint,0);
	    
		set @sql = N'select * from Equipment
					where OnOff = 0 or ZTst = 0 or ZTqd < 30
					order by collectioncode;'
		
		print @sql;
		
		EXEC sp_executesql  @sql
	end
END




GO

