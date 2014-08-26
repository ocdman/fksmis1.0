USE [fksmis1]
GO
/****** Object:  StoredProcedure [dbo].[pro_get_report_data]    Script Date: 08/19/2014 10:30:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<wbgong>
-- Create date: <2014-08-19>
-- Description:	<获取报表数据>
-- =============================================
CREATE PROCEDURE [dbo].[pro_get_report_data]
	@table_name varchar(20),
	@start_time datetime,
	@end_time datetime,
	@report_type varchar(2)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	label1:begin
		DECLARE @sql nvarchar(max),@bit bit, @smallint smallint;
	    
	    IF not EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(@table_name) AND type in (N'U'))
		begin
			select * from ReportInfo;
			return;
		end
	    
	    set @bit=1;
	    set @smallint = CONVERT(smallint, 0);
	    set @sql='';
	    --日报表
	    if @report_type = '01'
	    begin
			set @sql = @sql + N' select 0 as Id,@bit as IsDeleted,@start_time as AddDate, ''1'' as DetectorID1, ''2'' as DetectorID2,
							  CONVERT(datetime,t1.timeup + '':00'') as UploadTime, 
							  t3.fanruntime, t4.purifierruntime, t1.YouYanND, t1.YouYanSD,
							  t1.YouYanWD, t2.YouYanND as YouYanND2, t2.YouYanSD as YouYanSD2, t2.YouYanWD as YouYanWD2 from (';
			set @sql = @sql + N' select CONVERT(char(13), timeup, 120) as TimeUp, AVG(YouYanND) as YouYanND, AVG(YouYanSD) as YouYanSD,
							  AVG(YouYanWD) as YouYanWD from ' + @table_name;
			set @sql = @sql + N' where ProbeID = 1 and ZTfj = 1 and TimeUP between @start_time and @end_time
							  group by CONVERT(char(13), timeup, 120)) t1';
			set @sql = @sql + N' left join('
			set @sql = @sql + N' select CONVERT(char(13), timeup, 120) as TimeUp, AVG(YouYanND) as YouYanND, AVG(YouYanSD) as YouYanSD,
							  AVG(YouYanWD) as YouYanWD from ' + @table_name;
			set @sql = @sql + N' where ProbeID = 2 and ZTfj = 1 and TimeUP between @start_time and @end_time
							  group by CONVERT(char(13), timeup, 120)) t2
							  on t1.TimeUp = t2.TimeUp'
			set @sql = @sql + N' left join('
			set @sql = @sql + N' select CONVERT(char(13), timeup, 120) as TimeUp, COUNT(1) as FanRunTime from ' + @table_name;
			set @sql = @sql + N' where ZTfj = 1 and ProbeID = 1 and timeup between @start_time and @end_time
							  group by CONVERT(char(13), timeup, 120)) t3
							  on t2.TimeUp = t3.TimeUp'
			set @sql = @sql + N' left join('
			set @sql = @sql + N' select CONVERT(char(13), timeup, 120) as TimeUp, COUNT(1) as PurifierRunTime from ' + @table_name;
			set @sql = @sql + N' where ZTjhq = 1 and ProbeID = 1 and timeup between @start_time and @end_time
							  group by CONVERT(char(13), timeup, 120)) t4
							  on t3.TimeUp = t4.TimeUp
							  order by UploadTime;'	
		end	
		--周报表,月报表
		else if	@report_type = '02' or @report_type = '03'
		begin
			set @sql = @sql + N' select 0 as Id,@bit as IsDeleted,@start_time as AddDate, ''1'' as DetectorID1, ''2'' as DetectorID2,
							  CONVERT(date, t1.timeup, 111) as UploadTime, 
							  t3.fanruntime, t4.purifierruntime, t1.YouYanND, t1.YouYanSD,
							  t1.YouYanWD, t2.YouYanND as YouYanND2, t2.YouYanSD as YouYanSD2, t2.YouYanWD as YouYanWD2 from (';
			set @sql = @sql + N' select CONVERT(date, timeup, 111) as TimeUp, AVG(YouYanND) as YouYanND, AVG(YouYanSD) as YouYanSD,
							  AVG(YouYanWD) as YouYanWD from ' + @table_name;
			set @sql = @sql + N' where ProbeID = 1 and ZTfj = 1 and TimeUP between @start_time and @end_time
							  group by CONVERT(date, timeup, 111)) t1';
			set @sql = @sql + N' left join('
			set @sql = @sql + N' select CONVERT(date, timeup, 111) as TimeUp, AVG(YouYanND) as YouYanND, AVG(YouYanSD) as YouYanSD,
							  AVG(YouYanWD) as YouYanWD from ' + @table_name;
			set @sql = @sql + N' where ProbeID = 2 and ZTfj = 1 and TimeUP between @start_time and @end_time
							  group by CONVERT(date, timeup, 111)) t2
							  on t1.TimeUp = t2.TimeUp'
			set @sql = @sql + N' left join('
			set @sql = @sql + N' select CONVERT(date, timeup, 111) as TimeUp, COUNT(1) as FanRunTime from ' + @table_name;
			set @sql = @sql + N' where ZTfj = 1 and ProbeID = 1 and timeup between @start_time and @end_time
							  group by CONVERT(date, timeup, 111)) t3
							  on t2.TimeUp = t3.TimeUp'
			set @sql = @sql + N' left join('
			set @sql = @sql + N' select CONVERT(date, timeup, 111) as TimeUp, COUNT(1) as PurifierRunTime from ' + @table_name;
			set @sql = @sql + N' where ZTjhq = 1 and ProbeID = 1 and timeup between @start_time and @end_time
							  group by CONVERT(date, timeup, 111)) t4
							  on t3.TimeUp = t4.TimeUp
							  order by UploadTime;'	
		end	  
		--季度报表,年报表
		else if	@report_type = '04' or @report_type = '05'
		begin
			set @sql = @sql + N' select 0 as Id,@bit as IsDeleted,@start_time as AddDate, ''1'' as DetectorID1, ''2'' as DetectorID2,
							  CONVERT(datetime,t1.timeup + ''-01 00:00'') as UploadTime, 
							  t3.fanruntime, t4.purifierruntime, t1.YouYanND, t1.YouYanSD,
							  t1.YouYanWD, t2.YouYanND as YouYanND2, t2.YouYanSD as YouYanSD2, t2.YouYanWD as YouYanWD2 from (';
			set @sql = @sql + N' select CONVERT(char(7), timeup, 120) as TimeUp, AVG(YouYanND) as YouYanND, AVG(YouYanSD) as YouYanSD,
							  AVG(YouYanWD) as YouYanWD from ' + @table_name;
			set @sql = @sql + N' where ProbeID = 1 and ZTfj = 1 and TimeUP between @start_time and @end_time
							  group by CONVERT(char(7), timeup, 120)) t1';
			set @sql = @sql + N' left join('
			set @sql = @sql + N' select CONVERT(char(7), timeup, 120) as TimeUp, AVG(YouYanND) as YouYanND, AVG(YouYanSD) as YouYanSD,
							  AVG(YouYanWD) as YouYanWD from ' + @table_name;
			set @sql = @sql + N' where ProbeID = 2 and ZTfj = 1 and TimeUP between @start_time and @end_time
							  group by CONVERT(char(7), timeup, 120)) t2
							  on t1.TimeUp = t2.TimeUp'
			set @sql = @sql + N' left join('
			set @sql = @sql + N' select CONVERT(char(7), timeup, 120) as TimeUp, COUNT(1) as FanRunTime from ' + @table_name;
			set @sql = @sql + N' where ZTfj = 1 and ProbeID = 1 and timeup between @start_time and @end_time
							  group by CONVERT(char(7), timeup, 120)) t3
							  on t2.TimeUp = t3.TimeUp'
			set @sql = @sql + N' left join('
			set @sql = @sql + N' select CONVERT(char(7), timeup, 120) as TimeUp, COUNT(1) as PurifierRunTime from ' + @table_name;
			set @sql = @sql + N' where ZTjhq = 1 and ProbeID = 1 and timeup between @start_time and @end_time
							  group by CONVERT(char(7), timeup, 120)) t4
							  on t3.TimeUp = t4.TimeUp
							  order by UploadTime;'	
		end	
	    
	    print @sql;
	    
	    EXEC sp_executesql  @sql,
							N'@start_time datetime,@end_time datetime,@bit bit,@smallint smallint',   
							@start_time,@end_time,@bit,@smallint
	end	
END
GO