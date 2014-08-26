USE [fksmis1]
GO

/****** Object:  StoredProcedure [dbo].[pro_get_running_time]    Script Date: 07/24/2014 10:30:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<wbgong>
-- Create date: <2014-08-11>
-- Description:	<ÅÅ·ÅÁ¿>
-- =============================================
CREATE PROCEDURE [dbo].[pro_get_discharge]
	@table_name varchar(20),
	@start_time datetime,
	@end_time datetime
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	label1:begin
		DECLARE @sql nvarchar(max),@bit bit, @smallint smallint;
	    
	    IF not EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(@table_name) AND type in (N'U'))
		begin
			select * from DataStatistics;
			return;
		end
	    
	    set @bit=1;
	    set @smallint = CONVERT(smallint, 0);
	    set @sql='';
	    
	    set @sql = @sql + N' select CONVERT(real, AVG(YouYanND)) as YouYanND, convert(date,TimeUp,111) as TimeUp, Count(1) as FanRuntime,
							 @bit as IsDeleted, getdate() as AddDate, 0 as id, 0 as ProbeID,
							 getdate() as TimeGet from ' + @table_name;
	    set @sql = @sql + N' where ZTfj=1 and ProbeID=1 and convert(date,TimeUP,111) between @start_time and @end_time';
	    set @sql = @sql + N' group by convert(date,TimeUP,111) order by TimeUp';
	    
	    print @sql;
	    
	    EXEC sp_executesql  @sql,
							N'@start_time datetime,@end_time datetime,@bit bit,@smallint smallint',   
							@start_time,@end_time,@bit,@smallint
		
	end

	
END

GO

