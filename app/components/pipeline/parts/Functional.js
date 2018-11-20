import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Switch from '@material-ui/core/Switch';

import {
  AnatomicalRegistration,
  DistortionCorrection,
  MedianAngleCorrection,
  NuisanceRegression,
  TemplateRegistration,
  SliceTimingCorrection,
  Smoothing,
  TemporalFiltering
} from './functional'

import TristateSwitch from '../../TristateSwitch'

class Functional extends Component {
  static styles = theme => ({
    divider: {
      margin: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 3,
    },
    sectionTitle: {
      paddingTop: 10
    },
  })

  renderSection(title, name, component) {
    const { classes, configuration, onChange } = this.props
    const value = configuration.getIn(name.split('.'))

    return (
      <ExpansionPanel expanded={value}>
        <ExpansionPanelSummary>
          <Switch
            name={name}
            checked={value}
            onChange={onChange}
            color="primary"
          />
          <Typography variant="h6" className={classes.sectionTitle}>
            { title }
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {
            React.createElement(component, {
              configuration,
              onChange,
            })
          }
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <React.Fragment>

        {
          this.renderSection(
            "Slice Timing Correction",
            "functional.slice_timing_correction.enabled",
            SliceTimingCorrection
          )
        }

        {
          this.renderSection(
            "Functional to Anatomical Registration",
            "functional.anatomical_registration.enabled",
            AnatomicalRegistration
          )
        }

        {
          this.renderSection(
            "Functional to Template Registration",
            "functional.template_registration.enabled",
            TemplateRegistration
          )
        }

        {
          this.renderSection(
            "Distortion Correction",
            "functional.distortion_correction.enabled",
            DistortionCorrection
          )
        }

        {
          this.renderSection(
            "Nuisance Regression",
            "functional.nuisance_regression.enabled",
            NuisanceRegression
          )
        }

        {
          this.renderSection(
            "Median Angle Correction",
            "functional.median_angle_correction.enabled",
            MedianAngleCorrection
          )
        }

        {
          this.renderSection(
            "Temporal Filtering",
            "functional.temporal_filtering.enabled",
            TemporalFiltering
          )
        }

        {
          this.renderSection(
            "Smoothing / Z-Scoring",
            "functional.smoothing.enabled",
            Smoothing
          )
        }

      </React.Fragment>
    )
  }
}

export default withStyles(Functional.styles)(Functional);
