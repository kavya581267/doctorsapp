import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';

type WithSafeAreaViewProps = {
  safeAreaStyle?: ViewStyle;
};

const withSafeAreaView = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithSafeAreaViewProps> => {
  const ComponentWithSafeArea: React.FC<P & WithSafeAreaViewProps> = ({
    safeAreaStyle,
    ...props
  }) => {
    return (
      <SafeAreaView style={[styles.container, safeAreaStyle]}>
        <WrappedComponent {...(props as P)} />
      </SafeAreaView>
    );
  };

  return ComponentWithSafeArea;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withSafeAreaView;
