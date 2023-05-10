import React from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import cx from 'classnames';
import Trigger from 'rc-trigger';
import MobilePhoneEdit from 'src/components/newCustomFields/widgets/MobilePhone';
import withClickAway from 'ming-ui/decorators/withClickAway';
import createDecoratedComponent from 'ming-ui/decorators/createDecoratedComponent';
import { emitter, isKeyBoardInputChar } from 'worksheet/util';
import CellErrorTips from './comps/CellErrorTip';
const ClickAwayable = createDecoratedComponent(withClickAway);
import EditableCellCon from '../EditableCellCon';
import renderText from './renderText';
import { FROM } from './enum';

function replaceNotNumber(value) {
  return value
    .replace(/[^-\d.]/g, '')
    .replace(/^\./g, '')
    .replace(/^-/, '$#$')
    .replace(/-/g, '')
    .replace('$#$', '-')
    .replace(/^-\./, '-')
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.');
}
export default class MobilePhone extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.shape({}),
    editable: PropTypes.bool,
    isediting: PropTypes.bool,
    updateCell: PropTypes.func,
    popupContainer: PropTypes.any,
    cell: PropTypes.shape({ value: PropTypes.string }),
    value: PropTypes.string,
    needLineLimit: PropTypes.bool,
    updateEditingStatus: PropTypes.func,
    onClick: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      value: props.cell.value,
      tempValue: props.cell.value,
      forceShowFullValue: _.get(props.cell, 'advancedSetting.datamask') !== '1',
    };
  }

  editRef = React.createRef();

  get editPhoneObj() {
    try {
      return this.editRef.current.iti;
    } catch (err) {
      return undefined;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cell.value !== this.props.cell.value) {
      this.setState({ value: nextProps.cell.value });
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isediting && this.props.isediting) {
      this.focus();
    }
  }

  con = React.createRef();
  input = React.createRef();

  @autobind
  handleExit() {
    const { cell, updateEditingStatus } = this.props;
    updateEditingStatus(false);
    this.setState({
      value: cell.value,
      tempValue: cell.value,
    });
  }

  @autobind
  handleEdit(e) {
    const { updateEditingStatus } = this.props;
    e.stopPropagation();
    updateEditingStatus(true);
    if (this.listened) {
      return;
    }
  }

  @autobind
  handleBlur(target) {
    const { error, updateCell, updateEditingStatus } = this.props;
    const { tempValue, value } = this.state;
    if (error) {
      this.handleExit();
      return;
    }
    if (tempValue === value) {
      updateEditingStatus(false);
      return;
    }
    updateCell({
      value: tempValue,
    });
    this.setState({
      value: tempValue,
    });
    updateEditingStatus(false);
    this.lastBlurTime = null;
  }

  get masked() {
    const { cell, isCharge } = this.props;
    return this.state.value && (isCharge || _.get(cell, 'advancedSetting.isdecrypt') === '1');
  }

  focus(time) {
    setTimeout(() => {
      if (this.editPhoneObj) {
        this.editPhoneObj.telInput.focus();
      }
    }, time || 100);
  }

  @autobind
  async handleChange(value) {
    const { cell, onValidate } = this.props;
    onValidate(value);
    this.setState({
      tempValue: value,
    });
  }

  @autobind
  handleTableKeyDown(e) {
    const { cell, updateEditingStatus } = this.props;
    const setKeyboardValue = value => {
      updateEditingStatus(true, () => {
        setTimeout(() => {
          const inputDom = this.editRef.current.input;
          if (inputDom) {
            inputDom.value = value;
            this.handleChange(value);
          }
        }, 10);
      });
    };
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      if (window.tempCopyForSheetView) {
        setKeyboardValue(window.tempCopyForSheetView);
      } else {
        navigator.clipboard.readText().then(setKeyboardValue);
      }
      return;
    }
    switch (e.key) {
      default:
        (() => {
          const value = cell.type === 6 || cell.type === 8 ? replaceNotNumber(e.key) : e.key;
          if (!value || !isKeyBoardInputChar(e.key)) {
            return;
          }
          updateEditingStatus(true, () => {
            setTimeout(() => {
              const inputDom = this.editRef.current.input;
              if (inputDom) {
                inputDom.value = value;
                this.handleChange(value);
              }
            }, 10);
            e.stopPropagation();
            e.preventDefault();
          });
        })();
        break;
    }
  }

  @autobind
  handleKeydown(e) {
    const { tableId, cell, updateEditingStatus } = this.props;
    if (e.keyCode === 27) {
      updateEditingStatus(false);
      this.setState({
        value: cell.value,
      });
      e.preventDefault();
    } else if (e.keyCode === 13) {
      e.preventDefault();
      this.handleBlur();
      setTimeout(
        () =>
          emitter.emit('TRIGGER_TABLE_KEYDOWN_' + tableId, {
            keyCode: 40,
            stopPropagation: () => {},
            preventDefault: () => {},
          }),
        100,
      );
    }
  }

  @autobind
  handleUnMask(e) {
    if (!this.masked) {
      return;
    }
    e.stopPropagation();
    this.setState({ forceShowFullValue: true });
  }

  render() {
    const {
      tableType,
      className,
      style,
      error,
      rowIndex,
      from,
      needLineLimit,
      cell,
      popupContainer,
      editable,
      isediting,
      onClick,
    } = this.props;
    const { value, forceShowFullValue } = this.state;
    const isSafari = /^((?!chrome).)*safari.*$/.test(navigator.userAgent.toLowerCase());
    const isCard = from === FROM.CARD;
    const editProps = {
      ref: this.input,
      value,
      style: {
        width: style.width,
        height: style.height,
        padding: '7px 0px',
      },
      onClick: e => e.stopPropagation(),
    };
    const editcontent = (
      <ClickAwayable
        {...editProps}
        onClickAwayExceptions={[this.editIcon && this.editIcon.current]}
        onClickAway={this.handleBlur}
      >
        <MobilePhoneEdit
          inputClassName="cellMobileInput stopPropagation"
          enumDefault={cell.enumDefault}
          advancedSetting={cell.advancedSetting}
          value={value}
          ref={this.editRef}
          isCell={true}
          onChange={this.handleChange}
          onInputKeydown={this.handleKeydown}
        />
        {error && (
          <CellErrorTips
            error={typeof error === 'string' ? error : _l('不是有效的电话号码')}
            pos={rowIndex === 0 ? 'bottom' : 'top'}
          />
        )}
      </ClickAwayable>
    );
    return (
      <Trigger
        destroyPopupOnHide={!(navigator.userAgent.match(/[Ss]afari/) && !navigator.userAgent.match(/[Cc]hrome/))} // 不是 Safari
        action={['click']}
        popup={editcontent}
        getPopupContainer={isSafari ? undefined : cell.enumDefault === 0 ? () => document.body : popupContainer}
        popupClassName={cx('filterTrigger cellControlMobilePhoneEdit scrollInTable', {
          cellControlEdittingStatus: tableType !== 'classic',
          cellControlErrorStatus: error,
        })}
        popupVisible={isediting}
        popupAlign={{
          points: ['tl', 'tl'],
          offset: [0, 0],
          overflow: {
            adjustY: true,
          },
        }}
      >
        <EditableCellCon
          hideOutline
          onClick={onClick}
          className={cx(className, {
            canedit: editable,
            masked: this.masked && !isCard,
            maskHoverTheme: this.masked && isCard && !forceShowFullValue,
          })}
          style={style}
          iconName="hr_edit"
          isediting={isediting}
          onIconClick={this.handleEdit}
        >
          {!isediting && !!value && (
            <span className={cx('ellipsis', { linelimit: needLineLimit })} onClick={this.handleUnMask}>
              {renderText({ ...cell, value }, { noMask: forceShowFullValue })}
            </span>
          )}
          {isCard && this.masked && !forceShowFullValue && (
            <i
              className="icon icon-eye_off Hand maskData Font16 Gray_bd mLeft4 mTop4 hoverShow"
              style={{ verticalAlign: 'text-top' }}
              onClick={this.handleUnMask}
            ></i>
          )}
          {tableType === 'classic' && !isediting && !value && cell.hint && (
            <span className="guideText Gray_bd hide">{cell.hint}</span>
          )}
        </EditableCellCon>
      </Trigger>
    );
  }
}
