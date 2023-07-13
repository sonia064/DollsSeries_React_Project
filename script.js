const players = [
  {
    id: 1,
    name: "Thumbelina Princess Lia",
    image: "queen1.png"
  },
  {
    id: 2,
    name: "Lady Agnes",
    image: "queen2.jpg"
  },
  {
    id: 3,
    name: "Leisha Véronique",
    image: "queen3.png"
  },
  {
    id: 4,
    name: "Pritty Vhecarunnessa",
    image: "queen4.jpg"
  },
  {
    id: 5,
    name: "Miss Moffit Danka",
    image: "queen10.jpg"
  },
  {
    id: 6,
    name: "Bella Izza",
    image: "queen6.png"
  },
  {
    id: 7,
    name: "Creminda Lynne",
    image: "queen7.jpg"
  },
  {
    id: 8,
    name: "Miss Lizzie",
    image: "queen11.jpg"
  },
  {
    id: 9,
    name: "Yolanda Miranda Leisha",
    image: "queen12.jpg"
  }
];


function NotificationBar({ message }) {
  return (
    
      <div className="notification-bar">
       <div className="wave-animation"></div>
      <p className="notification-text">{message}</p>
     
    </div>
  );
}


function SelectedPlayerList({ selectedPlayers }) {
  return (
    <div className="selected-players">
      <h2>Selected Queens:</h2>
      <ol className="selected-players-list">
        {selectedPlayers.map((player, index) => (
          <li key={player.id} className="selected-player-name">
            {index + 1}. {player.name}
          </li>
        ))}
      </ol>
    </div>
  );
}


function App() {
  const [selectedPlayers, setSelectedPlayers] = React.useState([]);
  const [playerMoney, setPlayerMoney] = React.useState(0);
  const [managerMoney, setManagerMoney] = React.useState(0);
  const [refereeMoney, setRefereeMoney] = React.useState(0);
  const [totalMoney, setTotalMoney] = React.useState(0);
  const [showNotification, setShowNotification] = React.useState(false);


  const handlePlayerClick = (player) => {
    if (selectedPlayers.length >= 5) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);                   
      return;
    }

   
    const playerExists = selectedPlayers.some((selectedPlayer) => selectedPlayer.id === player.id);
    if (!playerExists) {
      setSelectedPlayers((prevSelectedPlayers) => [...prevSelectedPlayers, player]);
    }
    };

    
    const calculateTotalMoney = () => {
      let multipliedValue = selectedPlayers.reduce((total, player) => {
        return total + playerMoney;
      }, 0);
      
      const total = multipliedValue + managerMoney + refereeMoney;
      setTotalMoney(total);
    };
    
    
  React.useEffect(() => {
    if (selectedPlayers.length >= 6) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [selectedPlayers]);


  const firstRowPlayers = players.slice(0, 3);
  const secondRowPlayers = players.slice(3, 6);
  const thirdRowPlayers = players.slice(6, 9);


  return (
    <div>
      {showNotification && (
        <NotificationBar message="You can't select more than 5 Dolls." />
      )}
      <div className="container">
        <div className="row">
          {firstRowPlayers.map((player) => (
            <div className="card" key={player.id}>
              <button
                className={`card-name-button ${selectedPlayers.some(
                  (selectedPlayer) => selectedPlayer.id === player.id
                ) ? 'selected' : ''}`}
                onClick={() => handlePlayerClick(player)}
              >
                Click On
              </button>
              <img src={player.image} alt={player.name} />
              <div className="card-name">{player.name}</div>
            </div>
          ))}
          <SelectedPlayerList selectedPlayers={selectedPlayers} />
        </div>
        <div className="row">
          {secondRowPlayers.map((player) => (
            <div className="card" key={player.id}>
              <button
                className={`card-name-button ${selectedPlayers.some(
                  (selectedPlayer) => selectedPlayer.id === player.id
                ) ? 'selected' : ''}`}
                onClick={() => handlePlayerClick(player)}
              >
                Click On
              </button>
              <img src={player.image} alt={player.name} />
              <div className="card-name">{player.name}</div>
            </div>
          ))}
          <div className="calculator">
            <h2>Calculator</h2>
            <div className="input-group">
              <label htmlFor="player-money">Per Doll:</label>
              <input
                type="number"
                id="player-money"
                value={playerMoney}
                onChange={(e) => setPlayerMoney(parseInt(e.target.value))}
              />
            </div>
            <div className="multiplied-value">
              Multiplied Value: {(selectedPlayers.length * playerMoney).toFixed(2)}
            </div>
            <div className="input-group">
              <label htmlFor="manager-money">Per Series:</label>
              <input
                type="number"
                id="manager-money"
                value={managerMoney}
                onChange={(e) => setManagerMoney(parseInt(e.target.value))}
              />
            </div>
            <div className="input-group">
              <label htmlFor="referee-money">Others:</label>
              <input
                type="number"
                id="referee-money"
                value={refereeMoney}
                onChange={(e) => setRefereeMoney(parseInt(e.target.value))}
              />
            </div>
            <button  className="calculateButton" onClick={calculateTotalMoney}>Calculate</button>
            <div className="total-money">Total: {totalMoney.toFixed(2)}</div>
          </div>
        </div>
       <div className="row">
          {thirdRowPlayers.map((player) => (
            <div className="card" key={player.id}>
              <button
                className={`card-name-button ${selectedPlayers.some(
                  (selectedPlayer) => selectedPlayer.id === player.id
                ) ? 'selected' : ''}`}
                onClick={() => handlePlayerClick(player)}
              >
                Click On
              </button>
              <img src={player.image} alt={player.name} />
              <div className="card-name">{player.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
