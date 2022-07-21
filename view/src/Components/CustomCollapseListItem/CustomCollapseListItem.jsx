import { styled, ListItem } from '@mui/material';

const CustomCollapseListItem = styled(ListItem)(({ theme }) => ({
  '&.MuiListItem-root': {
    backgroundColor: '#fff',
    boxShadow: theme.shadows[5],
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '2px'
  }
}));

export default CustomCollapseListItem;