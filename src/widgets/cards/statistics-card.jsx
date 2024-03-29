import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function StatisticsCard({ color, icon, title, value, footer, id, data }) {
  return (
    <Card>
      <CardHeader
        variant="gradient"
        color={color}
        className="absolute -mt-4 grid h-16 w-16 place-items-center"
      >
        {icon}
      </CardHeader>
      <CardBody className="p-4 text-right">
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray">
          {
            (id === 1) ? '$ '+ data.GoldReserve :
             (id === 2) ? 'BTC ' + data.BitcoinReserve : 
             (id === 3) ? '$ ' + data.NaturaPrice : 
             (id === 4) ? '$ ' + data.MiscReserve : 
            //  (id === 5) ? 'NATURA ' + data.otherNaturaReleased : 
             (id === 6) ? 'NATURA ' + data.stakingRewardsClaimed : 
             (id === 7) ? 'NATURA ' + data.teamNaturaReleased :
             (id === 8) ? 'NATURA ' + data.rAndDRealeased : 
             (id === 9) ? 'NATURA ' + data.reserveNaturaReleased : 
            (id === 10) ? 'NATURA ' + data.incentiveProgramReleased : 
  
             '0.00'
          }
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 p-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;


