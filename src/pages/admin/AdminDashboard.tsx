import { useGetUserStatsQuery } from '@/api/userApi';
import { Grid2, Paper, Stack, Typography, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useMemo } from 'react';
import { DateRangePicker, DateRange } from 'materialui-daterange-picker';
import moment from 'moment';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useGetMissionStatsQuery } from '@/api/missionApi';

const AdminDashboard = () => {
  const [openDateRangePicker, setOpenDateRangePicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().subtract(7, 'days').toDate(),
    endDate: moment().toDate(),
  });

  const theme = useTheme();
  const { data: userStats } = useGetUserStatsQuery({ fromDate: dateRange.startDate?.toISOString(), toDate: dateRange.endDate?.toISOString() });
  const { data: missionStats } = useGetMissionStatsQuery({ fromDate: dateRange.startDate?.toISOString(), toDate: dateRange.endDate?.toISOString() });

  const userChartData = useMemo(() => {
    if (!userStats) return { xAxisData: [], seriesData: [] };

    const xAxisData = userStats.map(stat => moment(stat.date).format('MMM DD'));
    const seriesData = userStats.map(stat => stat.number_of_user);

    return { xAxisData, seriesData };
  }, [userStats]);

  const missionChartData = useMemo(() => {
    if (!missionStats) return { xAxisData: [], seriesData: [] };

    const xAxisData = missionStats.map(stat => moment(stat.date).format('MMM DD'));
    const seriesData = missionStats.map(stat => stat.number_of_mission);

    return { xAxisData, seriesData };
  }, [missionStats]);

  return (
    <Stack width="100%" height="calc(100vh - 40px)">
      <Typography variant="title-32-bold" mb={2}>Admin Dashboard</Typography>
      <Paper
        sx={{
          p: 6, height: '100%',
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          position="relative"
          sx={{
            '& .date-range-picker-wrapper': {
              position: 'absolute',
              zIndex: 999,
              top: 16,
              right: 8,
              'button[class^="materialui-daterange-picker-makeStyles-filled"], button[class*=" materialui-daterange-picker-makeStyles-filled"]': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              },
              'button[class^="materialui-daterange-picker-makeStyles-outlined"], button[class*=" materialui-daterange-picker-makeStyles-outlined"]': {
                border: `1px solid ${theme.palette.secondary.main}`,
              },
            }
          }}
        >
          <Typography variant="title-16-bold">
          Stats from {moment(dateRange.startDate).format('MMM DD, YYYY')} to {moment(dateRange.endDate).format('MMM DD, YYYY')}
          </Typography>
          <IconButton onClick={() => setOpenDateRangePicker(!openDateRangePicker)}>
            <EditIcon fontSize="small" color="primary" />
          </IconButton>
          <DateRangePicker
            open={openDateRangePicker}
            toggle={() => setOpenDateRangePicker(!openDateRangePicker)}
            onChange={range => setDateRange(range)}
            wrapperClassName="date-range-picker-wrapper"
            initialDateRange={dateRange}
          />
        </Stack>
        <Grid2 container spacing={4} mt={4}>
          <Grid2 size={6}>
            <Typography variant="subtitle-18-bold">Users</Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: userChartData.xAxisData }]}
              series={[{ data: userChartData.seriesData }]}
              colors={[theme.palette.primary.main]}
              height={400}
            />
          </Grid2>
          <Grid2 size={6}>
            <Typography variant="subtitle-18-bold">Missions</Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: missionChartData.xAxisData }]}
              series={[{ data: missionChartData.seriesData }]}
              colors={[theme.palette.primary.main]}
              height={400}
            />
          </Grid2>
        </Grid2>
      </Paper>
    </Stack>
  );
};

export default AdminDashboard;