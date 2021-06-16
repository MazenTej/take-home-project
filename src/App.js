import "./App.css";
import { mockFetchHelper } from "./mock_api";
import { useState } from "react";
import albums from "./albums.json";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

function App() {
  var show = false;
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();

  const [data, setData] = useState();

  function handleClick() {
    const promise = mockFetchHelper(true, data, 1000);
    promise.then(handleCall);
  }

  function handleCall() {
    setData(albums.albums);
  }
  if (data != null) {
    show = true;
  }

  if (show) {
    for (var i = 0; i <= 4; i++) {
      delete data[i].avg_user_rating;
      data[i].release_date = formatDate(data[i].release_date);
      data[i].genres = data[i].genres.toString();

      for (var j = 1; j <= 4; j++) {
        if (data[j].last_listened > data[i].last_listened) {
          const b = data[i];
          data[i] = data[j];
          data[j] = b;
        }
      }
    }
  }

  function formatDate(date) {
    return moment(date).format("MM/DD/YYYY HH:MM");
  }

  return (
    <div className="App">
      {show === false && (
        <div className="container">
          <div className="center">
            <Button
              className="button"
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Click me
            </Button>
          </div>
        </div>
      )}
      <TableContainer component={Paper}>
        {show === true && (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Album</TableCell>
                <TableCell>Band</TableCell>
                <TableCell>Genres</TableCell>
                <TableCell>Last Played</TableCell>
                <TableCell>Release Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.album_title}>
                  <TableCell>{row.album_title}</TableCell>
                  <TableCell>{row.band_name}</TableCell>
                  <TableCell>{row.genres}</TableCell>
                  <TableCell>{row.last_listened}</TableCell>
                  <TableCell>{row.release_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
}

export default App;
