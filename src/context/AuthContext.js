
import React from 'react';
  const AuthContext = React.createContext({
    
    authenticated: false,
    setAuthenticated: (authenticated) => {
        this.authenticated = authenticated;
    },
   
  });
  export default AuthContext;

  {/*
		<AuthContext.Consumer >

			{({ authenticated, setAuthenticated }) => {
				setAuthenticated(authenticatedGlobal);
				return (
					<SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>

						<NavigationContainer>
							<Stack.Navigator>
								<Stack.Screen name="Home" component={Home} />
								<Stack.Screen name="OTPLogin" component={OTPLoginComponent} />
							</Stack.Navigator>

						</NavigationContainer>

					</SafeAreaView >
				)
			}}



		</AuthContext.Consumer>*/}